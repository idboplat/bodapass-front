import { ColDef } from "ag-grid-community";

export const GRID_COLS: ColDef[] = [
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
    cellStyle: { justifyContent: "flex-start", paddingLeft: "7px" },
  },
  {
    field: "회사 유형",
    width: 120,
    resizable: true,
    editable: true,
  },
  {
    field: "상위 회사 코드",
    width: 100,
    resizable: true,
    editable: true,
  },
  {
    field: "상위 회사 명",
    width: 100,
    resizable: true,
    editable: true,
    cellStyle: { justifyContent: "flex-start", paddingLeft: "7px" },
  },
  {
    field: "생성인",
    width: 180,
    resizable: true,
    editable: true,
  },
  {
    field: "생성 일시",
    width: 220,
    resizable: true,
    editable: true,
  },
  {
    field: "Account",
    width: 180,
    resizable: true,
    editable: true,
  },
];
