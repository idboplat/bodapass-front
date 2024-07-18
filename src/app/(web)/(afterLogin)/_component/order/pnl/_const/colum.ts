import { COLUMN_STYLE } from "@/app/_const/cols";
import { ColDef } from "ag-grid-community";

export const GRID_COLS: ColDef[] = [
  {
    field: "일자",
    width: 180,
    resizable: true,
    editable: true,
  },
  {
    field: "일련번호",
    width: 100,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.right,
  },
  {
    field: "사용자 ID",
    width: 120,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.left,
  },
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
    width: 180,
    resizable: true,
    editable: true,
  },
  {
    field: "수량",
    width: 220,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.right,
  },
  {
    field: "체결 일자",
    width: 220,
    resizable: true,
    editable: true,
  },
  {
    field: "체결 번호",
    width: 220,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.right,
  },
  {
    field: "작업자",
    width: 220,
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
    width: 220,
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
