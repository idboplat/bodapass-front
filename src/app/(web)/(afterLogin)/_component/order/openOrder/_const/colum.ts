import { COLUMN_SIZE, COLUMN_STYLE } from "@/app/_const/cols";
import { FieldNames } from "@/type/api";
import { ColDef } from "ag-grid-community";

export type RowData = Record<FieldNames, string>;
export const GRID_COLS: ColDef[] = [
  {
    field: "주문 일시",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
  },
  {
    field: "회사 코드",
    width: COLUMN_SIZE.md,
    resizable: true,
    editable: true,
  },
  {
    field: "회사",
    width: COLUMN_SIZE.lg,
    resizable: true,
    editable: true,
  },
  {
    field: "계좌 번호",
    width: COLUMN_SIZE["2xl"],
    resizable: true,
    editable: true,
  },
  {
    field: "사용자 ID",
    width: COLUMN_SIZE.lg,
    resizable: true,
    editable: true,
  },
  {
    field: "종목",
    width: COLUMN_SIZE.sm,
    resizable: true,
    editable: true,
  },
  {
    field: "레버리지",
    width: COLUMN_SIZE.md,
    resizable: true,
    editable: true,
  },
  {
    field: "주문 구분",
    width: COLUMN_SIZE.md,
    resizable: true,
    editable: true,
  },
  {
    field: "주문 가격 구분",
    width: COLUMN_SIZE.md,
    resizable: true,
    editable: true,
  },
  {
    field: "매수/매도",
    width: COLUMN_SIZE.md,
    resizable: true,
    editable: true,
  },
  {
    field: "주문 가격",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
  },
  {
    field: "주문 수량",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
  },
  {
    field: "체결 수량",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
  },
];
