import { CellStyle } from "ag-grid-community";

export enum Column {
  "일시" = 180,
  "수량" = 180,
}

export const COLUMN_SIZE = {
  sm: 180,
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
