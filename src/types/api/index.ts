import type { RspnData } from "@/libraries/callTms";

export type Range<N extends number, Current extends number[] = []> = Current["length"] extends N // 현재 배열 길이가 N이면
  ? Exclude<Current[number] | N, 0> // 배열에 0을 제외, N을 추가한 후 유니온으로 변환
  : Range<N, [...Current, Current["length"]]>; // 아니면 재귀적으로 호출

// 숫자를 F형식의 문자열로 변환하는 타입
export type ToFString<N extends number> = N extends 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  ? `F0${N}` // 1부터 9까지는 0을 붙여 변환
  : `F${N}`; // 10 이상은 그대로 변환

export type StringRspn<N extends number> = RspnData<Record<ToFString<Range<N>>, string>>;
export type FillerRspn = RspnData<Record<ToFString<Range<1>>, "">>;

/** 회사 등록 */
export type TBW_000000_P01 = StringRspn<5>;

/** 상품 정보(종목)(코인선물) 조회  */
export type TBW_000000_Q01 = StringRspn<13>;

/** 그룹 코드(사원)(공통) 로그인  */
export type TBW_000001_P01 = StringRspn<6>;

/** 그룹 코드(사원)(공통) 로그아웃  */
export type TBW_000001_P02 = FillerRspn;

/** 그룹 코드(사원)(공통) 등록(서브관리자)  */
export type TBW_000010_P01 = FillerRspn;

/** 계좌 입출고(코인선물) - 신청 접수(사원)  */
export type TBW_000100_P01 = FillerRspn;

/** 계좌 입출고(코인선물) - 신청 접수 취소(사원)  */
export type TBW_000100_P02 = FillerRspn;

/** 계좌 입출고(코인선물) - 신청 접수 거부(사원)(관리자)  */
export type TBW_000100_P03 = FillerRspn;

/** 계좌 입출고(코인선물) - 신청 적용 완료(사원)(관리자)  */
export type TBW_000100_P04 = FillerRspn;

/** 계좌 입출고(코인선물) - 신청 접수(고객)  */
export type TBW_000200_P01 = StringRspn<3>;

/** 계좌 입출고(코인선물) - 신청 접수 취소(고객)  */
export type TBW_000200_P02 = FillerRspn;

/** 계좌 입출고(코인선물) - 신청 접수 거부(고객)(관리자)  */
export type TBW_000200_P03 = FillerRspn;

/** 계좌 입출고(코인선물) - 신청 적용 완료(고객)(관리자)  */
export type TBW_000200_P04 = FillerRspn;

/** 계좌 잔고(코인선물) 입고(G1)  */
export type TBW_000300_P01 = FillerRspn;
/** 계좌 잔고(코인선물) 입출고(G1) 조회  */
export type TBW_000300_Q01 = StringRspn<6>;

/** 그룹 코드(회사)(공통) 조회  */
export type TBW_000000_R01 = StringRspn<9>;

/** 그룹 코드(사원)(공통) 조회  */
export type TBW_000001_Q01 = StringRspn<9>;

/** 당사 입금 신청 내역(B2B) 조회  */
export type TBW_001000_Q01 = StringRspn<15>;

/** 위탁 입금 신청 내역(B2B) 조회  */
export type TBW_001000_Q02 = StringRspn<15>;

/** 입출금 신청 내역(B2C) 조회 */
export type TBW_001000_R01 = StringRspn<15>;

/** 입출금 내역 조회 */
export type TBW_002000_Q01 = StringRspn<14>;

/** 고객 손익 내역 조회(관리자) */
export type TBW_006000_R01 = StringRspn<12>;

/** 사용자 정보(공통) 조회 */
export type TBW_000001_S01 = StringRspn<9>;

/** 미체결 내역 조회 */
export type TBW_006000_Q01 = StringRspn<18>;

/** 주문 내역 조회 */
export type TBW_006000_Q02 = StringRspn<18>;

/** 체결 내역 조회 */
export type TBW_006000_Q03 = StringRspn<20>;

/** 계좌 잔고(코인선물) 출고가능 수량 조회 */
export type TBW_002000_S02 = StringRspn<2>;

/** 입출금 신청 내역 존재 유무 조회 */
export type TBW_001000_Q03 = StringRspn<3>;
