"use client";

import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { GRID_COLS } from "../_const/colum";
import { tableWrap } from "./table.css";
import classNames from "classnames";
import { useQuery } from "@tanstack/react-query";
import callTms from "@/model/callTms";
import { Session } from "next-auth";
import { TBW_000300_Q01 } from "@/type/api";
import { useCoinStore } from "../_lib/store";
import { MVIO_TP_ITEM, convertText } from "@/app/_const/tp";
import { stringToDate } from "@/app/_lib/regexp";

export default function Table({ session }: { session: Session }) {
  const [colDefs] = useState([...GRID_COLS]);
  const coinStore = useCoinStore();

  const { data } = useQuery({
    queryKey: ["TBW_000300_Q01", coinStore],
    queryFn: async () => {
      const TBW_000300_Q01Res = await callTms<TBW_000300_Q01>({
        session,
        svcId: "TBW_000300_Q01",
        data: [coinStore.mvioTp], // 입출고 구분
        pgSize: 20,
      });
      const TBW_000300_Q01Data = TBW_000300_Q01Res.svcRspnData || [];
      return TBW_000300_Q01Data;
    },
    select: (data) => {
      const result = data.map((item) => ({
        회사코드: item.F01,
        "발행 일자": stringToDate(item.F02),
        "발행 일련번호": item.F03,
        "종목 코드": item.F04,
        // "입출고 구분": convertText(MVIO_TP_ITEM, item.F05),
        "발행 수량": item.F06,
        "생성 작업 ID": item.F07,
        "생성 작업 일시": item.F08,
        "변경 작업 ID": item.F09,
        "변경 작업 일시": item.F10,
      }));
      return result;
    },
    enabled: coinStore.nonce > 0,
  });

  const rowData = coinStore.nonce === 0 ? [] : data;

  return (
    <div className={classNames("ag-theme-alpine", tableWrap)}>
      <AgGridReact
        columnDefs={colDefs}
        rowData={rowData}
        overlayNoRowsTemplate={"<span>데이터가 없습니다.</span>"}
        headerHeight={28}
        rowHeight={28}
      />
    </div>
  );
}
