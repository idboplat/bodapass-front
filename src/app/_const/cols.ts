import { CellStyle } from "ag-grid-community";

export enum Column {
  "일시" = 180,
  "수량" = 180,
}

type ColumnSizeType = "sm" | "md" | "lg" | "xl" | "2xl";
export const COLUMN_SIZE: Record<ColumnSizeType, number> = {
  sm: 80,
  md: 180,
  lg: 180,
  xl: 180,
  "2xl": 180,
};

type ColumnStyleType = "left" | "right";

export const COLUMN_STYLE: Record<ColumnStyleType, CellStyle> = {
  left: { justifyContent: "flex-start", paddingLeft: "7px" },
  right: { justifyContent: "flex-end", paddingRight: "7px" },
};
