import { COLUMN_SIZE, COLUMN_STYLE } from "@/app/_const/cols";
import { ColDef } from "ag-grid-community";

export const GRID_COLS: ColDef[] = [
  {
    field: "발행 일시",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
  },
  {
    field: "회사 코드",
    width: COLUMN_SIZE.md,
    resizable: true,
    editable: true,
  },
  {
    field: "회사 명",
    width: COLUMN_SIZE.lg,
    resizable: true,
    editable: true,
  },
  {
    field: "종목",
    width: COLUMN_SIZE.sm,
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
    field: "발행인",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
  },
];
