// 회사 유형 select
export const corpGrpTpItemsMap: Record<string, string[]> = {
  G1: ["전체", "메인거래소", "중개사(G2)", "거래소"],
  G2: ["전체", "중개사(G2)", "중개사(G3)", "거래소"],
  G3: ["전체", "중개사(G3)", "거래소"],
  G4: ["거래소"],
};

// 회사 생성 모달의 회사 그룹 구분 select
export const corpGrpItemsMap: Record<string, string[]> = {
  G1: ["중개사(G2)", "거래소"],
  G2: ["중개사(G3)", "거래소"],
  G3: ["거래소"],
};

export const getCorpGrpTpItems = (map: Record<string, string[]>, value: string): string[] =>
  map[value] || [];
