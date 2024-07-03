type Entity = [string, string][];

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
  ["REQ", "신청"],
  ["CAN", "취소"],
  ["REJ", "거부"],
  ["APL", "완료"],
];

export const findEntity = (entity: Entity, value: string) => {
  return entity.find(([tp, text]) => tp === value || text === value);
};

export const convertText = (entity: Entity, value: string) => {
  return Object.fromEntries(entity)[value] || value;
};
