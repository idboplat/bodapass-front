import { COLUMN_SIZE, COLUMN_STYLE } from "@/app/_const/cols";
import { ColDef } from "ag-grid-community";

export const GRID_COLS: ColDef[] = [
  {
    field: "체결 일시",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
  },
  {
    field: "회사",
    width: COLUMN_SIZE.lg,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.left,
  },
  {
    field: "사용자 ID",
    width: COLUMN_SIZE.lg,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.left,
  },
  {
    field: "종목",
    width: COLUMN_SIZE.sm,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.left,
  },
  {
    field: "레버리지",
    width: COLUMN_SIZE.sm,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.right,
  },
  {
    field: "매수/매도",
    width: COLUMN_SIZE.md,
    resizable: true,
    editable: true,
  },
  {
    field: "체결가",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.right,
  },
  {
    field: "체결 수량",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.right,
  },
  {
    field: "진입가",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.right,
  },
  {
    field: "수수료",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.right,
  },
  {
    field: "손익",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.right,
  },
];
