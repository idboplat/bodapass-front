import { COLUMN_SIZE, COLUMN_STYLE } from "@/app/_const/cols";
import { ColDef } from "ag-grid-community";

export type RowData = {
  "외부 사용자 ID": string;
  "접근 유형": string;
  "회사 코드": string;
  "회사 명": string;
  "주 회사 코드": string;
  "주 회사 명": string;
  생성인: string;
  "생성 일시": string;
};

export const GRID_COLS: ColDef[] = [
  {
    field: "외부 사용자 ID",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.left,
  },
  {
    field: "접근 유형",
    width: COLUMN_SIZE.md,
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
    field: "주 회사 코드",
    width: COLUMN_SIZE.md,
    resizable: true,
    editable: true,
  },
  {
    field: "주 회사 명",
    width: COLUMN_SIZE.lg,
    resizable: true,
    editable: true,
  },
  {
    field: "생성인",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
  },
  {
    field: "생성 일시",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
  },
];
