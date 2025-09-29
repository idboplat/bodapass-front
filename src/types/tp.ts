export type Entity = [string, string][];

/**  회사 그룹 구분 */
export const CORP_GRP_ITEM: Entity = [
  ["G1", "메인거래소"],
  ["G2", "중개사(G2)"],
  ["G3", "중개사(G3)"],
  ["G4", "거래소"],
];

/** 입출고 구분 */
export const MVIO_TP_ITEM: Entity = [
  ["I", "입고"],
  ["O", "출고"],
];

/**  입출고 적요 구분 */
export const MVIO_RMRK_ITEM: Entity = [
  ["1", "매매손익"],
  ["2", "매매 수수료"],
  ["3", "입출고"],
];

/** 신청 상태 구분 */
export const RGST_STAT_ITEM: Entity = [
  ["REQ", "승인 대기"],
  ["CAN", "신청 취소"],
  ["REJ", "승인 반려"],
  ["APL", "승인 완료"],
];

/** 매수매도 구분 */
export const BYSL_TP_ITEM: Entity = [
  ["B", "매수"],
  ["S", "매도"],
];

/** 호가 구분 */
export const AKPRC_TP: Entity = [
  ["N", "신규"],
  ["M", "정정"],
  ["C", "취소"],
];

/** 주문 가격 구분 */
export const ORDR_PRC_TP: Entity = [
  ["LM", "지정가"],
  ["MK", "시장가"],
  ["SL", "스탑리밋"],
  ["SM", "스탑마켓"],
];

export const USEABLE_TP: Entity = [
  ["Y", "사용가능"],
  ["N", "사용제한"],
];

export const IdCardEntity: Entity = [
  ["1", "주민등록증"],
  ["2", "운전면허증"],
  ["3", "외국인등록증"],
];

export const findEntity = (entity: Entity, value: string) => {
  return entity.find(([tp, text]) => tp === value || text === value);
};
