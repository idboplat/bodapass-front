"use client";
import PagePagination from "@/app/_component/pagination/PagiPagination";
import { AKPRC_TP, BYSL_TP_ITEM, findEntity, ORDR_PRC_TP } from "@/app/_const/tp";
import { dateToString } from "@/app/_lib/dateFormatter";
import callTms from "@/model/callTms";
import { TBW_006000_Q02 } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import classNames from "classnames";
import { Session } from "next-auth";
import { useState } from "react";
import { GRID_COLS } from "../_const/colum";
import { useTradeHistoryStore } from "../_lib/store";
import css from "./Table.module.scss";
import { convertToStandardDateTime } from "@/app/_lib/regexp";
import { sortDecimal } from "@/app/_lib/numberFormatter";

const PAGE_SIZE = 20;

interface TableProps {
  session: Session;
}

export default function Table({ session }: TableProps) {
  const [colDefs] = useState([...GRID_COLS]);
  const [total, setTotal] = useState(-1);
  const orderHistoryStore = useTradeHistoryStore();

  const { data } = useQuery({
    queryKey: ["TBW_006000_Q02", orderHistoryStore],
    queryFn: async () => {
      const TBW_006000_R01Res = await callTms<TBW_006000_Q02>({
        session,
        svcId: "TBW_006000_Q02",
        data: [
          session.user.corpCd,
          orderHistoryStore.instCd,
          dateToString(orderHistoryStore.date[0]),
          dateToString(orderHistoryStore.date[1]),
          findEntity(BYSL_TP_ITEM, orderHistoryStore.mvioTp)?.[0] || "",
        ],
        pgSize: PAGE_SIZE,
        pgSn: orderHistoryStore.page,
      });
      setTotal(() => TBW_006000_R01Res.svcTotRecCnt);
      const TBW_006000_R01Data = TBW_006000_R01Res.svcRspnData || [];
      return TBW_006000_R01Data;
    },
    select: (data) => {
      const result = data.map((item) => ({
        "주문 일시": convertToStandardDateTime(item.F01),
        "회사 코드": item.F02,
        "회사 명": item.F03,
        "계좌 번호": item.F04,
        "사용자 ID": item.F05,
        종목: item.F06,
        레버리지: item.F07,
        "주문 구분": findEntity(AKPRC_TP, item.F08)?.[1] || "",
        "주문 가격 구분": findEntity(ORDR_PRC_TP, item.F09)?.[1] || "",
        "매수/매도": findEntity(BYSL_TP_ITEM, item.F10)?.[1] || "",
        "주문 가격": sortDecimal({
          decimalLength: parseInt(item.F17),
          num: item.F11,
          requireComma: true,
        }),
        "주문 수량": sortDecimal({
          decimalLength: parseInt(item.F18),
          num: item.F12,
          requireComma: true,
        }),
        "체결 수량": sortDecimal({
          decimalLength: parseInt(item.F18),
          num: item.F13,
          requireComma: true,
        }),
        "가격 소수점": item.F17,
        "수량 소수점": item.F18,
      }));
      return result;
    },
    enabled: orderHistoryStore.nonce > 0,
  });

  const rowData = orderHistoryStore.nonce === 0 ? [] : data;

  return (
    <>
      <div className={classNames("ag-theme-alpine", css.tableWrap)}>
        <AgGridReact
          columnDefs={colDefs}
          rowData={rowData}
          overlayNoRowsTemplate={
            orderHistoryStore.nonce === 0 ? "<span></span>" : "<span>데이터가 없습니다.</span>"
          }
          headerHeight={28}
          rowHeight={28}
        />
      </div>
      {total !== -1 && (
        <PagePagination
          currentPage={orderHistoryStore.page}
          totalCnt={total}
          pgSize={PAGE_SIZE}
          groupSize={10}
          onChange={orderHistoryStore.actions.setPage}
        />
      )}
    </>
  );
}
