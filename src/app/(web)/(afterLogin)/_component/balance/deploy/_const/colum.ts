import { addComma } from "@/app/_lib/regexp";
import { ColDef, ValueFormatterParams } from "ag-grid-community";

export const GRID_COLS: ColDef[] = [
  {
    field: "회사 코드",
    width: 100,
    resizable: true,
    editable: true,
  },
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
  {
    field: "종목",
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
