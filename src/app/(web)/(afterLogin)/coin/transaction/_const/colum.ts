import { ColDef } from "ag-grid-community";

export const GRID_COLS: ColDef[] = [
  {
    field: "회사코드",
    width: 160,
    resizable: true,
    editable: true,
  },
  {
    field: "회사명",
    width: 180,
    resizable: true,
    editable: true,
  },
  {
    field: "구매요청수량",
    width: 180,
    resizable: true,
    editable: true,
  },
  {
    field: "요청상태",
    width: 160,
    resizable: true,
    editable: true,
  },
  {
    field: "요청일시",
    width: 200,
    resizable: true,
    editable: true,
  },
  {
    field: "처리일시",
    width: 200,
    resizable: true,
    editable: true,
  },
  {
    field: "요청사원 ID",
    width: 200,
    resizable: true,
    editable: true,
  },
  {
    field: "처리사원 ID",
    width: 200,
    resizable: true,
    editable: true,
  },
];
