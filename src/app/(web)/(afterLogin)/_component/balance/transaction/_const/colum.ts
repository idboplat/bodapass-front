import { ColDef } from "ag-grid-community";

export type RowData = {
  "회사 코드": string;
  일자: string;
  일련번호: string;
  계좌번호: string;
  "종목 코드": string;
  "입출 구분": string;
  "적요 구분": string;
  수량: string;
  "잔고 수량": string;
  "상태 구분": string;
  작업자: string;
  "생성 일시": string;
  수정자: string;
  "수정 일시": string;
};

export const GRID_COLS: ColDef[] = [
  // {
  //   field: "회사 코드",
  //   width: 100,
  //   resizable: true,
  //   editable: true,
  // },
  {
    field: "일자",
    width: 100,
    resizable: true,
    editable: true,
  },
  {
    field: "일련번호",
    width: 120,
    resizable: true,
    editable: true,
    cellStyle: { justifyContent: "flex-end", paddingRight: "7px" },
  },
  // {
  //   field: "계좌 번호",
  //   width: 140,
  //   resizable: true,
  //   editable: false,
  // },
  {
    field: "종목 코드",
    width: 100,
    resizable: true,
    editable: true,
  },
  {
    field: "입출 구분",
    width: 100,
    resizable: true,
    editable: true,
  },
  {
    field: "적요 구분",
    width: 100,
    resizable: true,
    editable: true,
  },
  {
    field: "수량",
    width: 180,
    resizable: true,
    editable: true,
    cellStyle: { justifyContent: "flex-end", paddingRight: "7px" },
  },
  // {
  //   field: "잔고 수량",
  //   width: 180,
  //   resizable: true,
  //   editable: true,
  // },
  {
    field: "상태 구분",
    width: 100,
    resizable: true,
    editable: true,
  },

  {
    field: "작업자",
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
    field: "수정자",
    width: 180,
    resizable: true,
    editable: true,
  },
  {
    field: "수정 일시",
    width: 220,
    resizable: true,
    editable: true,
  },
];
