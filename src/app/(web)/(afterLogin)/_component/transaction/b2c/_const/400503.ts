import { COLUMN_SIZE, COLUMN_STYLE } from "@/app/_const/cols";
import { ColDef } from "ag-grid-community";

export const GRID_400503_COLS: ColDef[] = [
  {
    field: "신청 일시",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
  },
  {
    field: "회사 코드",
    width: COLUMN_SIZE.md,
    resizable: true,
    editable: false,
    cellStyle: COLUMN_STYLE.left,
  },
  {
    field: "회사 명",
    width: COLUMN_SIZE.lg,
    resizable: true,
    editable: false,
    cellStyle: COLUMN_STYLE.left,
  },
  {
    field: "사용자 ID",
    width: COLUMN_SIZE.lg,
    resizable: true,
    editable: false,
    cellStyle: COLUMN_STYLE.left,
  },
  {
    field: "종목",
    width: COLUMN_SIZE.sm,
    resizable: true,
    editable: true,
  },
  {
    field: "입/출",
    width: COLUMN_SIZE.md,
    resizable: true,
    editable: true,
  },
  {
    field: "수량",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.right,
  },
  {
    field: "신청 상태",
    width: COLUMN_SIZE.md,
    resizable: true,
    editable: true,
  },
  {
    field: "처리 일시",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: false,
  },

  {
    field: "처리자",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
  },
];
