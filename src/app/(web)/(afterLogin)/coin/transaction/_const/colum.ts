import { ColDef } from "ag-grid-community";

export type RowData = {
  회사코드: string;
  "입출고 일자": string;
  "입출고 일련번호": string;
  "계좌 번호": string;
  "종목 코드": string;
  "입출고 구분": string;
  "입출고 적요 구분": string;
  "입출고 수량": string;
  "잔고 수량": string;
  "신청 상태 구분": string;
  "생성 작업 ID": string;
  "생성 작업 일시": string;
  "변경 작업 ID": string;
  "변경 작업 일시": string;
};

export const GRID_COLS: ColDef[] = [
  {
    field: "회사코드",
    width: 100,
    resizable: true,
    editable: true,
  },
  {
    field: "입출고 일자",
    width: 100,
    resizable: true,
    editable: true,
  },
  {
    field: "입출고 일련번호",
    width: 100,
    resizable: true,
    editable: true,
  },
  {
    field: "계좌 번호",
    width: 140,
    resizable: true,
    editable: false,
  },
  {
    field: "종목 코드",
    width: 100,
    resizable: true,
    editable: true,
  },
  {
    field: "입출고 구분",
    width: 100,
    resizable: true,
    editable: true,
  },
  {
    field: "입출고 적요 구분",
    width: 100,
    resizable: true,
    editable: true,
  },
  {
    field: "신청 상태 구분",
    width: 100,
    resizable: true,
    editable: true,
  },
  {
    field: "입출고 수량",
    width: 180,
    resizable: true,
    editable: true,
  },
  {
    field: "잔고 수량",
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
  {
    field: "변경 작업 ID",
    width: 180,
    resizable: true,
    editable: true,
  },
  {
    field: "변경 작업 일시",
    width: 220,
    resizable: true,
    editable: true,
  },
];
