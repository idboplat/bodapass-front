import { COLUMN_SIZE, COLUMN_STYLE } from "@/app/_const/cols";
import { ColDef } from "ag-grid-community";

export const GRID_400502_COLS: ColDef[] = [
  {
    field: "회사 코드",
    width: 100,
    resizable: true,
    editable: true,
  },
  {
    field: "회사",
    width: 100,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.left,
  },
  {
    field: "일자",
    width: 100,
    resizable: true,
    editable: true,
  },
  {
    field: "일련번호",
    width: COLUMN_SIZE.sm,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.right,
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
    cellStyle: COLUMN_STYLE.right,
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
    editable: false,
  },

  {
    field: "작업자",
    width: 180,
    resizable: true,
    editable: true,
  },
  {
    field: "생성 일시",
    width: 180,
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
    width: 180,
    resizable: true,
    editable: true,
  },
];
