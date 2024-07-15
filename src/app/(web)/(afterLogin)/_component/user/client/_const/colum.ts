import { ColDef } from "ag-grid-community";

export type RowData = {
  "외부 사용자 ID": string;
  "접근 유형": string;
  "회사 코드": string;
  "회사 명": string;
  "주 회사 코드": string;
  "주 회사 명": string;
  "생성 작업 ID": string;
  "생성 작업 일시": string;
};

export const GRID_COLS: ColDef[] = [
  {
    field: "외부 사용자 ID",
    width: 180,
    resizable: true,
    editable: true,
    cellStyle: { justifyContent: "flex-start", paddingLeft: "7px" },
  },
  {
    field: "접근 유형",
    width: 120,
    resizable: true,
    editable: true,
  },
  {
    field: "회사 코드",
    width: 120,
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
    field: "주 회사 코드",
    width: 100,
    resizable: true,
    editable: true,
  },
  {
    field: "주 회사 명",
    width: 180,
    resizable: true,
    editable: true,
  },
  {
    field: "생성 작업 ID",
    width: 180,
    resizable: true,
    editable: true,
  },
  {
    field: "생성 작업 일시",
    width: 220,
    resizable: true,
    editable: true,
  },
];
