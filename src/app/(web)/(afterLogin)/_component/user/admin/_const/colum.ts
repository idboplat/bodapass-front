import { COLUMN_STYLE } from "@/app/_const/cols";
import { ColDef } from "ag-grid-community";

export type RowData = {
  "관리자 코드": string;
  "관리자 ID": string;
  "관리자 명": string;
  "회사 코드": string;
  "회사 명": string;
  생성자: string;
  "생성 일시": string;
};

export const GRID_COLS: ColDef[] = [
  {
    field: "관리자 코드",
    width: 140,
    resizable: true,
    editable: true,
  },
  {
    field: "관리자 ID",
    width: 120,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.left,
  },
  {
    field: "관리자 명",
    width: 120,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.left,
  },
  {
    field: "회사 코드",
    width: 100,
    resizable: true,
    editable: true,
  },
  {
    field: "회사 명",
    width: 100,
    resizable: true,
    editable: true,
  },
  {
    field: "생성자",
    width: 180,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.left,
  },
  {
    field: "생성 일시",
    width: 180,
    resizable: true,
    editable: true,
  },
];
