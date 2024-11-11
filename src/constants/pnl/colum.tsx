import { COLUMN_SIZE, COLUMN_STYLE } from "@/types/agGrid";
import ExchangRateInfo from "@/components/ExchangeRateInfo";
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
