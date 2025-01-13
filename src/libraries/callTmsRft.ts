import CryptoJS from "crypto-js";
import { TmsError } from "@/libraries/error/TmsError";

/** svcErrYn이 true로 응답되도 에러처리 하지않는 에러코드 목록 */
const EXCLUDE_RSPN_CDS: string[] = [];

// export type TmsRequest = ReturnType<typeof genarateBody>;

/** 데이터가 없을시 null로 내려온다 */
export type RspnData<T> = T[] | null;
export type RspnDataItem<T extends RspnData<any>> = NonNullable<T>[0];

export type TmsRspnList<T> = {
  svcTransKey: number;
  svcId: string;
  svcErrYn: boolean;
  svcRspnCd: string;
  svcRspnMsg: string;
  svcRspnPageSize: number;
  svcNextPageSn: number;
  svcRspnData: T;
};

export type TmsResponse<T> = {
  apiTranKey: number;
  apiErrYn: boolean;
  apiRspnCd: string;
  apiRspnMsg: string;
  svcRspnList: TmsRspnList<T>[];
};

type CallTmsSingleArg = {
  /** session이 없을때는 null로 */
  session: Session | null;
  svcId: string;
  data: string[];
  /** @default pgSize - 15 */
  pgSize?: number;
  /** csv 다운로드 여부 */
  downYn?: boolean;
  /** instanceOf를 통해 분기처리 가능 */
  ignore?: boolean;
};

type CallTmsMultiArg = {
  /** session이 없을때는 null로 */
  session: Session | null;
  svcList: {
    svcId: string;
    data: string[];
    /** @default pgSize - 15 */
    pgSize?: number;
    /** csv 다운로드 여부 */
    downYn?: boolean;
    /** instanceOf를 통해 분기처리 가능 */
    ignore?: boolean;
  }[];
};

class CallTms {
  public static isArray<T>(item: T | T[]): item is T[] {
    return Array.isArray(item);
  }
  private static convertData(data: string[]) {
    const result: Record<string, string> = {};
    data.forEach((item, i) => {
      const index = i + 1;
      const key = index < 10 ? `F0${index}` : `F${index}`;
      result[key] = item;
    });
    return result;
  }
  async single() {}
  async multiple() {}
}
