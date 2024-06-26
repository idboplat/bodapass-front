type Entity = [string, string][];

export const CORP_GRP_ITEM: Entity = [
  ["G1", "메인거래소"],
  ["G2", "중개사(G2)"],
  ["G3", "중개사(G3)"],
  ["G4", "거래소"],
];

export const MVIO_RMRK_ITEM: Entity = [
  ["1", "매매손익"],
  ["2", "매매 수수료"],
  ["3", "입출고"],
];

export const RGST_STAT_ITEM: Entity = [
  ["REQ", "접수"],
  ["CAN", "취소"],
  ["REJ", "거부"],
  ["APL", "완료"],
];

export const findEntity = (entity: Entity, value: string) => {
  return entity.find(([tp, text]) => tp === value || text === value);
};

export const getMvioTp = (value: string) => {
  if (value === "I") {
    return "입고";
  } else {
    return "출고";
  }
};

export const getMvioRmrkTp = (value: string) => {
  if (value === "1") {
    return "매매손익";
  } else if (value === "2") {
    return "매매 수수료";
  } else if (value === "3") {
    return "입출고";
  }
};
