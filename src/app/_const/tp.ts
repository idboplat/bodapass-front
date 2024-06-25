export const CORP_GRP_ITEM = {
  G1: "메인거래소",
  G2: "중개사(G2)",
  G3: "중개사(G3)",
  G4: "거래소",
} as const;

type CORP_GRP_KEY_TYPE = (keyof typeof CORP_GRP_ITEM)[];
export const CORP_GRP_KEY = Object.keys(CORP_GRP_ITEM) as unknown as CORP_GRP_KEY_TYPE;
export const CORP_GRP_VALUE = Object.values(CORP_GRP_ITEM);
export const CORP_GRP_ENTRY = Object.entries(CORP_GRP_ITEM);

export const MVIO_TP_ITEM = {
  G1: "메인거래소",
  G2: "중개사(G2)",
  G3: "중개사(G3)",
  G4: "거래소",
} as const;
