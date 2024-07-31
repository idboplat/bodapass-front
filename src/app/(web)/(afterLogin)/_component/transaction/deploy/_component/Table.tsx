"use client";
import PagePagination from "@/app/_component/pagination/PagePagination";
import { dateToString } from "@/app/_lib/dateFormatter";
import { convertToStandardDateTime } from "@/app/_lib/regexp";
import callTms from "@/model/callTms";
import { TBW_000300_Q01 } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import classNames from "classnames";
import { Session } from "next-auth";
import { useState } from "react";
import { GRID_COLS } from "../_const/colum";
import { useCoinStore } from "../_lib/store";
import { tableWrap } from "./table.css";
import { sortDecimal } from "@/app/_lib/numberFormatter";

const PAGE_SIZE = 20;

export default function Table({ session }: { session: Session }) {
  const [colDefs] = useState([...GRID_COLS]);
  const [total, setTotal] = useState(-1);
  const coinStore = useCoinStore();

  const { data } = useQuery({
    queryKey: ["TBW_000300_Q01", coinStore],
    queryFn: async () => {
      const TBW_000300_Q01Res = await callTms<TBW_000300_Q01>({
        session,
        svcId: "TBW_000300_Q01",
        data: [
          session.user.corpCd,
          dateToString(coinStore.date[0]),
          dateToString(coinStore.date[1]),
        ],
        pgSize: PAGE_SIZE,
        pgSn: coinStore.page,
      });

      setTotal(() => TBW_000300_Q01Res.svcTotRecCnt);
      const TBW_000300_Q01Data = TBW_000300_Q01Res.svcRspnData || [];
      return TBW_000300_Q01Data;
    },
    select: (data) => {
      const result = data.map((item) => ({
        "발행 일시": convertToStandardDateTime(item.F01),
        "회사 코드": item.F02,
        "회사 명": item.F03,
        종목: item.F04,
        수량: sortDecimal({ num: item.F05, decimalLength: 2, requireComma: true }),
        발행자: item.F06,
      }));
      return result;
    },
    enabled: coinStore.nonce > 0,
  });

  const rowData = coinStore.nonce === 0 ? [] : data;

  return (
    <>
      <div className={classNames("ag-theme-alpine", tableWrap)}>
        <AgGridReact
          columnDefs={colDefs}
          rowData={rowData}
          overlayNoRowsTemplate={
            coinStore.nonce === 0 ? "<span></span>" : "<span>데이터가 없습니다.</span>"
          }
          headerHeight={28}
          rowHeight={28}
        />
      </div>
      {total !== -1 && (
        <PagePagination
          currentPage={coinStore.page}
          totalCnt={total}
          pgSize={PAGE_SIZE}
          groupSize={10}
          onChange={coinStore.actions.setPage}
        />
      )}
    </>
  );
}
