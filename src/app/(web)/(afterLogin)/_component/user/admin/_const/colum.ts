import { COLUMN_STYLE, COLUMN_SIZE } from "@/app/_const/cols";
import { ColDef } from "ag-grid-community";

export type RowData = {
  "관리자 코드": string;
  "관리자 ID": string;
  "관리자 명": string;
  "회사 코드": string;
  "회사 명": string;
  생성인: string;
  "생성 일시": string;
};

export const GRID_COLS: ColDef[] = [
  {
    field: "관리자 코드",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
  },
  {
    field: "관리자 ID",
    width: COLUMN_SIZE.lg,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.left,
  },
  {
    field: "관리자 명",
    width: COLUMN_SIZE.lg,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.left,
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
    field: "생성인",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.left,
  },
  {
    field: "생성 일시",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
  },
];
