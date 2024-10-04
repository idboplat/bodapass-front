import { COLUMN_SIZE, COLUMN_STYLE } from "@/app/_const/cols";
import ExchangRateInfo from "@web/(afterLogin)/_component/ExchangeRateInfo";
import { ColDef, ICellRendererParams } from "ag-grid-community";

type RowData = {
  "손익 일시": string;
  "회사 코드": string;
  "회사 명": string;
  "계좌 번호": string;
  "사용자 ID": string;
  종목: string;
  "적요 구분": string;
  수량: string;
  "체결 일자": string;
  "체결 번호": string;
  환율: string;
};

export const GRID_COLS: ColDef[] = [
  {
    field: "손익 일시",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
  },
  {
    field: "회사 코드",
    width: COLUMN_SIZE.sm,
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
    field: "계좌 번호",
    width: COLUMN_SIZE.lg,
    resizable: true,
    editable: true,
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
  },
  {
    field: "적요 구분",
    width: COLUMN_SIZE.md,
    resizable: true,
    editable: true,
  },
  {
    field: "수량 USDL(≒ KRW)",
    width: COLUMN_SIZE.xl,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.right,
    cellRenderer: (arg: ICellRendererParams<RowData, undefined, undefined>) => {
      const qty = arg.data?.수량;
      const exchRate = arg.data?.환율;
      if (!qty || !exchRate) return null;
      return <ExchangRateInfo num={qty} decimalLength={2} exchRate={exchRate} />;
    },
    cellRendererParams: {
      decimalLength: 2,
    },
  },
  {
    field: "체결 일자",
    width: COLUMN_SIZE.md,
    resizable: true,
    editable: true,
  },
  {
    field: "체결 번호",
    width: COLUMN_SIZE.sm,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.right,
  },
];
