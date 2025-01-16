import CryptoJS from "crypto-js";
import { TmsError } from "@/libraries/error/TmsError";
import dayjs from "@/libraries/dayjs";

export const isArray = <T>(item: T | T[]): item is T[] => {
  return Array.isArray(item);
};

/** svcErrYn이 true로 응답되도 에러처리 하지않는 에러코드 목록 */
const EXCLUDE_RSPN_CDS: string[] = [];

export type TmsRequest = ReturnType<typeof genarateBody>;
/** 데이터가 없을시 null로 내려온다 */
export type RspnData<T> = T[] | null;
export type RspnDataItem<T extends RspnData<any>> = NonNullable<T>[0];

export interface TmsRspnList<T> {
  svcTransKey: number;
  svcId: string;
  svcErrYn: boolean;
  svcRspnCd: string;
  svcRspnMsg: string;
  /** 현재 페이지 건수 */
  svcRspnPageSize: number;
  /** 0이면 다음 페이지 없음 */
  svcNextPageSn: number;
  /** 전체 조회 건수 */
  svcTotRecCnt: number;
  svcRspnData: T;
}

export interface TmsResponse<T> {
  apiTranKey: number;
  apiErrYn: boolean;
  apiRspnCd: string;
  apiRspnMsg: string;
  svcRspnList: TmsRspnList<T>[];
}

export interface CallTmsArg {
  /** session이 없을때는 null로 */
  session: Session | null;
  svcId: string;
  data: string[];
  /** @default pgSize - 15 */
  pgSize?: number;
  /** @default pgSn - 1 */
  pgSn?: number;
  /** csv 다운로드 여부 */
  downYn?: boolean;
  /** instanceOf를 통해 분기처리 가능 */
  ignore?: boolean;
}

const argumentCustom = (args: string[]) => {
  const result: Record<string, string> = {};
  args.forEach((item, i) => {
    const index = i + 1;
    const key = index < 10 ? `F0${index}` : `F${index}`;
    result[key] = item;
  });
  return result;
};

const getHashSha256 = (data: string) => {
  const hash = CryptoJS.SHA256(data);
  return hash.toString(CryptoJS.enc.Hex);
};

export const genarateBody = ({
  svcId,
  pgSize,
  session,
  downYn,
  data,
  pgSn,
}: {
  svcId: string;
  pgSize?: number;
  session: Session | null;
  downYn?: boolean;
  pgSn?: number;
  data: any[];
}) => {
  /** YYYYMMDDHHmmssSSS */
  const currentTime = dayjs().utc().format("YYYYMMDDHHmmssSSS");

  const svcRqst = {
    svcTranKey: 1,
    svcId,
    svcIntfcVer: "1.0.0",
    svcMdtyYn: true,
    svcCsvDownYn: downYn || false,
    svcRqstPageSize: pgSize ?? 15, //default 15
    svcRqstPageSn: pgSn || 1,
    svcRqstData: [argumentCustom(data)], // svcRqstData 배열 초기화
  };

  const apiBody = {
    apiTranKey: 1,
    apiCallDtm: currentTime,
    apiLangCd: "KO",
    // apiCorpCd: session?.corpCd || "",
    apiUserId: session?.id || "guest",
    svcRqstList: [svcRqst],
  };

  return apiBody;
};

const callTms = async <T extends RspnData<any>>({
  session,
  svcId,
  data,
  pgSize,
  downYn,
  pgSn,
  ignore,
}: CallTmsArg) => {
  const body = genarateBody({
    svcId,
    pgSize,
    session,
    downYn,
    data,
    pgSn: pgSn,
  });

  const jsonBody = JSON.stringify(body);

  const headers: HeadersInit = {
    "Content-type": "application/json; charset=UTF-8",
  };

  if (session) {
    //2차인증 통과시 암호화
    headers["X-Content-Hash"] = getHashSha256(jsonBody + session.sessionKey);
    headers["X-TMS-SES-ID"] = session.sessionId;
  }

  const isServer = typeof window === "undefined";
  const baseUrl = isServer ? process.env.WAS_HTTP_URL : "";
  const requertUrl = baseUrl + "/api/call_tms_svc";

  const response = await fetch(requertUrl, {
    method: "POST",
    headers,
    body: jsonBody,
    cache: "no-cache",
    credentials: "include",
  });

  if (response.ok === false) {
    const message = `network status - [${response.status}] \n fetch failed`;
    throw new TmsError({
      requestSvcId: svcId,
      message,
      ignore,
    });
  }

  const tmsResult: TmsResponse<T> = await response.json();
  const tmsData = tmsResult?.svcRspnList?.[0];

  if (tmsData === undefined) {
    const message = "tmsData is undefined \n Requested resource not found";
    throw new TmsError({ requestSvcId: svcId, message, ignore });
  }

  if (tmsData.svcId && tmsData.svcId !== svcId) {
    const message = `svcid is unMatched \n requested svcId === ${svcId} \n responsed svcId === ${tmsData.svcId} \n Requested resource not matched`;
    throw new TmsError({
      requestSvcId: svcId,
      responseSvcId: tmsData.svcId,
      message,
      ignore,
    });
  }

  if (tmsData.svcErrYn === true) {
    //조회자료가 없을 경우, 에러처리 하지않는다.
    const isExclude = EXCLUDE_RSPN_CDS.includes(tmsData.svcRspnCd);

    if (isExclude === false) {
      const message = tmsData.svcRspnMsg;
      throw new TmsError({
        requestSvcId: svcId,
        responseSvcId: tmsData.svcId,
        message,
        ignore,
      });
    }
  }

  return tmsData;
};

export default callTms;
