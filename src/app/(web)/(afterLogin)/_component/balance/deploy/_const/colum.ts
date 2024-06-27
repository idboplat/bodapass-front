import { addComma } from "@/app/_lib/regexp";
import { ColDef, ValueFormatterParams } from "ag-grid-community";

export const GRID_COLS: ColDef[] = [
  {
    field: "회사코드",
    width: 100,
    resizable: true,
    editable: true,
  },
  {
    field: "발행 일자",
    width: 100,
    resizable: true,
    editable: true,
  },
  {
    field: "발행 일련번호",
    width: 120,
    resizable: true,
    editable: true,
  },
  {
    field: "종목 코드",
    width: 100,
    resizable: true,
    editable: true,
  },
  // {
  //   field: "입출고 구분",
  //   width: 100,
  //   resizable: true,
  //   editable: true,
  // },
  {
    field: "발행 수량",
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
