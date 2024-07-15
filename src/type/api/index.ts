import type { RspnData } from "@/model/callTms";

export type Filler = "";
export type FillerRspnData = RspnData<{ F01: Filler }>;
export type StringRspnData = RspnData<{ F01: string }>;

/** 회사 등록 */
export type TBW_000000_P01 = RspnData<{
  F01: string;
  F02: string;
  F03: string;
  F04: string;
  F05: string;
}>;

/** 상품 정보(종목)(코인선물) 조회  */
export type TBW_000000_Q01 = RspnData<{
  F01: string;
  F02: string;
  F03: string;
  F04: string;
  F05: string;
  F06: string;
  F07: string;
  F08: string;
  F09: string;
  F10: string;
  F11: string;
  F12: string;
  F13: string;
}>;

/** 그룹 코드(사원)(공통) 로그인  */
export type TBW_000001_P01 = RspnData<{
  F01: string;
  F02: string;
  F03: string;
  F04: string;
  F05: string;
  F06: string;
}>;

/** 그룹 코드(사원)(공통) 로그아웃  */
export type TBW_000001_P02 = RspnData<{
  F01: Filler;
}>;

/** 그룹 코드(사원)(공통) 등록(서브관리자)  */
export type TBW_000010_P01 = RspnData<{
  F01: Filler;
}>;

/** 계좌 입출고(코인선물) - 신청 접수(사원)  */
export type TBW_000100_P01 = RspnData<{
  F01: Filler;
}>;

/** 계좌 입출고(코인선물) - 신청 접수 취소(사원)  */
export type TBW_000100_P02 = RspnData<{
  F01: Filler;
}>;

/** 계좌 입출고(코인선물) - 신청 접수 거부(사원)(관리자)  */
export type TBW_000100_P03 = RspnData<{
  F01: Filler;
}>;

/** 계좌 입출고(코인선물) - 신청 적용 완료(사원)(관리자)  */
export type TBW_000100_P04 = RspnData<{
  F01: Filler;
}>;

/** 계좌 입출고(코인선물) - 신청 접수(고객)  */
export type TBW_000200_P01 = RspnData<{
  F01: string;
  F02: string;
  F03: string;
}>;

/** 계좌 입출고(코인선물) - 신청 접수 취소(고객)  */
export type TBW_000200_P02 = RspnData<{
  F01: Filler;
}>;

/** 계좌 입출고(코인선물) - 신청 접수 거부(고객)(관리자)  */
export type TBW_000200_P03 = RspnData<{
  F01: Filler;
}>;

/** 계좌 입출고(코인선물) - 신청 적용 완료(고객)(관리자)  */
export type TBW_000200_P04 = RspnData<{
  F01: Filler;
}>;

/** 계좌 잔고(코인선물) 입고(G1)  */
export type TBW_000300_P01 = RspnData<{
  F01: Filler;
}>;

/** 계좌 잔고(코인선물) 입출고(G1) 조회  */
export type TBW_000300_Q01 = RspnData<{
  F01: string;
  F02: string;
  F03: string;
  F04: string;
  F05: string;
  F06: string;
  F07: string;
  F08: string;
  F09: string;
  F10: string;
}>;

/** 그룹 코드(회사)(공통) 조회  */
export type TBW_000000_R01 = RspnData<{
  F01: string;
  F02: string;
  F03: string;
  F04: string;
  F05: string;
  F06: string;
  F07: string;
  F08: string;
}>;

/** 그룹 코드(사원)(공통) 조회  */
export type TBW_000001_Q01 = RspnData<{
  F01: string;
  F02: string;
  F03: string;
  F04: string;
  F05: string;
  F06: string;
  F07: string;
  F08: string;
}>;

/** 계좌 입출고(코인선물) 내역 조회  */
export type TBW_001000_Q01 = RspnData<{
  F01: string;
  F02: string;
  F03: string;
  F04: string;
  F05: string;
  F06: string;
  F07: string;
  F08: string;
  F09: string;
  F10: string;
  F11: string;
  F12: string;
  F13: string;
  F14: string;
  F15: string;
}>;

/** 입출금 신청 내역(B2C) 조회 */
export type TBW_001000_R01 = RspnData<{
  F01: string;
  F02: string;
  F03: string;
  F04: string;
  F05: string;
  F06: string;
  F07: string;
  F08: string;
  F09: string;
  F10: string;
  F11: string;
  F12: string;
  F13: string;
  F14: string;
  F15: string;
}>;

/** 입출금 내역 조회 */
export type TBW_002000_Q01 = RspnData<{
  F01: string;
  F02: string;
  F03: string;
  F04: string;
  F05: string;
  F06: string;
  F07: string;
  F08: string;
  F09: string;
  F10: string;
  F11: string;
  F12: string;
  F13: string;
  F14: string;
  F15: string;
}>;

export type TBW_006000_R01 = RspnData<{
  F01: string;
  F02: string;
  F03: string;
  F04: string;
  F05: string;
  F06: string;
  F07: string;
  F08: string;
  F09: string;
  F10: string;
  F11: string;
  F12: string;
  F13: string;
  F14: string;
  F15: string;
  F16: string;
  F17: string;
  F18: string;
  F19: string;
}>;

/** 사용자 정보(공통) 조회 */
export type TBW_000001_S01 = RspnData<{
  F01: string;
  F02: string;
  F03: string;
  F04: string;
  F05: string;
  F06: string;
  F07: string;
  F08: string;
  F09: string;
}>;
