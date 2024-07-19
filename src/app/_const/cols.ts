import { CellStyle } from "ag-grid-community";

type ColumnSizeType = "sm" | "md" | "lg" | "xl" | "2xl";

export const COLUMN_SIZE: Record<ColumnSizeType, number> = {
  sm: 80, // 일련번호, 종목코드
  md: 100, // 회사 코드, 일자, 입출구분, 적요구분, 상태구분
  lg: 120, // 회사명, ID
  xl: 180, // 일시,  수량, 생성인, 관리자코드
  "2xl": 220, //  체결번호
};

type ColumnStyleType = "left" | "right";

export const COLUMN_STYLE: Record<ColumnStyleType, CellStyle> = {
  left: { justifyContent: "flex-start", paddingLeft: "7px" },
  right: { justifyContent: "flex-end", paddingRight: "7px" },
};
