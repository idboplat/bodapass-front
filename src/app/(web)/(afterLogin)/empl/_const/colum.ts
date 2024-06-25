import { ColDef } from "ag-grid-community";

export type RowData = {
  사원ID: string;
  사원명: string;
  회사코드: string;
  회사명: string;
  생성작업ID: string;
  생성작업일시: string;
  변경작업ID: string;
  변경작업일시: string;
};

export const GRID_COLS: ColDef[] = [
  {
    field: "사원ID",
    width: 160,
    resizable: true,
    editable: true,
  },
  {
    field: "사원명",
    width: 180,
    resizable: true,
    editable: true,
  },
  {
    field: "회사코드",
    width: 180,
    resizable: true,
    editable: true,
  },
  {
    field: "회사명",
    width: 160,
    resizable: true,
    editable: true,
  },
  {
    field: "생성작업ID",
    width: 250,
    resizable: true,
    editable: true,
  },
  {
    field: "생성작업일시",
    width: 250,
    resizable: true,
    editable: true,
  },
  {
    field: "변경작업ID",
    width: 250,
    resizable: true,
    editable: true,
  },
  {
    field: "변경작업일시",
    width: 250,
    resizable: true,
    editable: true,
  },
];
