import CryptoJS from "crypto-js";
import { TmsError } from "@/libraries/error/tms-error";
import dayjs from "@/libraries/dayjs";
import ky from "ky";

/** svcErrYn이 true로 응답되도 에러처리 하지않는 에러코드 목록 */
const EXCLUDE_RSPN_CDS: string[] = [];

export type Range<N extends number, Current extends number[] = []> = Current["length"] extends N // 현재 배열 길이가 N이면
  ? Exclude<Current[number] | N, 0> // 배열에 0을 제외, N을 추가한 후 유니온으로 변환
  : Range<N, [...Current, Current["length"]]>; // 아니면 재귀적으로 호출

// 숫자를 F형식의 문자열로 변환하는 타입
export type ToFString<N extends number> = N extends 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  ? `F0${N}` // 1부터 9까지는 0을 붙여 변환
  : `F${N}`; // 10 이상은 그대로 변환

export type Filler = "";
export type StringRspnData<N extends number> = RspnData<Record<ToFString<Range<N>>, string>>;
export type FillerRspnData = RspnData<Record<ToFString<Range<1>>, Filler>>;

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
  locale: string;
  data: string[];
  /** @default pgSize - 15 */
  pgSize?: number;
  /** @default pgSn - 1 */
  pgSn?: number;
  /** instanceOf를 통해 분기처리 가능 */
  ignore?: boolean;
  signal?: AbortSignal;
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

export const genarateBody = (args: {
  svcId: string;
  locale: string;
  pgSize?: number;
  session: Session | null;
  pgSn?: number;
  data: any[];
}) => {
  /** YYYYMMDDHHmmssSSS */
  const currentTime = dayjs().utc().format("YYYYMMDDHHmmssSSS");

  const svcRqst = {
    svcTranKey: 1,
    svcId: args.svcId,
    svcIntfcVer: "1.0.0",
    svcMdtyYn: true,
    svcRqstPageSize: args.pgSize ?? 15, //default 15
    svcRqstPageSn: args.pgSn || 1,
    svcRqstData: [argumentCustom(args.data)], // svcRqstData 배열 초기화
  };

  const apiBody = {
    apiTranKey: 1,
    apiCallDtm: currentTime,
    apiLangCd: args.locale.toUpperCase(),
    apiCorpCd: args.session?.corpCd || "",
    apiUserId: args.session?.userId || "guest",
    svcRqstList: [svcRqst],
  };

  return apiBody;
};

// TMS API를 위한 ky 인스턴스 생성
export const tmsApi = ky.create({
  prefixUrl:
    typeof window === "undefined" || // server side
    process.env.NEXT_PUBLIC_FRONT_URL.startsWith("https://cw-front.loganstone.org") // 브라우저 개발환경
      ? process.env.NEXT_PUBLIC_WAS_HTTP_URL
      : process.env.NEXT_PUBLIC_FRONT_URL + "/proxy", // proxy설정, CORS 문제 해결
  hooks: {
    beforeRequest: [
      (request) => {
        // 기본 헤더만 설정
        request.headers.set("Content-type", "application/json; charset=UTF-8");
      },
    ],
    beforeRetry: [],
    afterResponse: [],
    beforeError: [],
  },
});

export const callTms = async <T extends RspnData<any>>(args: CallTmsArg) => {
  const jsonBody = JSON.stringify(
    genarateBody({
      svcId: args.svcId,
      locale: args.locale,
      pgSize: args.pgSize,
      session: args.session,
      data: args.data,
      pgSn: args.pgSn,
    }),
  );

  const headers: HeadersInit = {};

  if (args.session) {
    //2차인증 통과시 암호화
    headers["X-Content-Hash"] = getHashSha256(jsonBody + args.session.sessionKey);
    headers["X-TMS-SES-ID"] = args.session.sessionId;
  }

  const tmsResult = await tmsApi
    .post<TmsResponse<T>>("api/call_tms_svc", {
      headers,
      body: jsonBody,
      signal: args.signal,
    })
    .json();

  const tmsData = tmsResult?.svcRspnList?.[0];

  if (tmsData === undefined) {
    const message = "tmsData is undefined \n Requested resource not found";
    throw new TmsError({ requestSvcId: args.svcId, message, ignore: args.ignore });
  }

  if (tmsData.svcId && tmsData.svcId !== args.svcId) {
    const message = `svcid is unMatched \n requested svcId === ${args.svcId} \n responsed svcId === ${tmsData.svcId} \n Requested resource not matched`;
    throw new TmsError({
      requestSvcId: args.svcId,
      responseSvcId: tmsData.svcId,
      message,
      ignore: args.ignore,
    });
  }

  if (tmsData.svcErrYn === true) {
    //조회자료가 없을 경우, 에러처리 하지않는다.
    const isExclude = EXCLUDE_RSPN_CDS.includes(tmsData.svcRspnCd);

    if (isExclude === false) {
      const message = tmsData.svcRspnMsg;
      throw new TmsError({
        requestSvcId: args.svcId,
        responseSvcId: tmsData.svcId,
        message,
        ignore: args.ignore,
      });
    }
  }

  return tmsData;
};
