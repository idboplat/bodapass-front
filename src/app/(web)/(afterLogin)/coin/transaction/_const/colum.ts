import { ColDef } from "ag-grid-community";

export type RowData = {
  회사코드: string;
  회사명: string;
  구매요청수량: string;
  요청상태: string;
  요청일시: string;
  처리일시: string;
  요청사원ID: string;
  처리사원ID: string;
};

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
    editable: false,
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
