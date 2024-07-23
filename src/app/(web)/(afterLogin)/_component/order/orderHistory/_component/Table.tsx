"use client";
import PagePagination from "@/app/_component/pagination/PagePagination";
import { BYSL_TP_ITEM, findEntity } from "@/app/_const/tp";
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
import { tableWrap } from "./table.css";

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
          findEntity(BYSL_TP_ITEM, orderHistoryStore.mvioTp)?.[0] || "",
          dateToString(orderHistoryStore.date[0]),
          dateToString(orderHistoryStore.date[1]),
        ],
        pgSize: PAGE_SIZE,
        pgSn: orderHistoryStore.page,
      });
      setTotal(() => TBW_006000_R01Res.svcTotRecCnt);
      const TBW_006000_R01Data = TBW_006000_R01Res.svcRspnData || [];
      return TBW_006000_R01Data;
    },
    select: (data) => {
      console.log(data);
      const result = data.map((item) => ({}));
      return result;
    },
    enabled: orderHistoryStore.nonce > 0,
  });

  const rowData = orderHistoryStore.nonce === 0 ? [] : data;

  return (
    <>
      <div className={classNames("ag-theme-alpine", tableWrap)}>
        <AgGridReact
          columnDefs={colDefs}
          rowData={[]}
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
