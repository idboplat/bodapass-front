import { COLUMN_SIZE, COLUMN_STYLE } from "@/app/_const/cols";
import ExchangRateInfo from "@web/(afterLogin)/_component/ExchangeRateInfo";
import { ColDef, ICellRendererParams } from "ag-grid-community";

type RowData = {
  "체결 일시": string;
  "회사 코드": string;
  "회사 명": string;
  "계좌 번호": string;
  "사용자 ID": string;
  종목: string;
  레버리지: string;
  "매수/매도": string;
  체결가: string;
  "체결 수량": string;
  진입가: string;
  수수료: string;
  손익: string;
  "가격 소수점": string;
  "수량 소수점": string;
  환율: string;
};

export const GRID_COLS: ColDef[] = [
  {
    field: "체결 일시",
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
    field: "회사 명",
    width: COLUMN_SIZE.lg,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.left,
  },
  {
    field: "사용자 ID",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.left,
  },
  {
    field: "종목",
    width: COLUMN_SIZE.sm,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.left,
  },
  {
    field: "레버리지",
    width: COLUMN_SIZE.sm,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.right,
  },
  {
    field: "매수/매도",
    width: COLUMN_SIZE.md,
    resizable: true,
    editable: true,
  },
  {
    field: "체결가",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.right,
  },
  {
    field: "체결 수량",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.right,
  },
  {
    field: "진입가",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.right,
  },
  {
    field: "수수료",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.right,
  },
  {
    field: "수수료(KRW)",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.right,
  },
  {
    field: "손익",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.right,
  },
  {
    field: "손익(KRW)",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.right,
  },
];
