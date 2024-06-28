"use client";
import { MVIO_RMRK_ITEM, MVIO_TP_ITEM, convertText } from "@/app/_const/tp";
import { dateToString } from "@/app/_lib/dateFormatter";
import { convertToStandardDateTime, stringToDate } from "@/app/_lib/regexp";
import callTms from "@/model/callTms";
import { TBW_001000_Q01 } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import classNames from "classnames";
import { Session } from "next-auth";
import { useState } from "react";
import { useTransactionStore } from "../_lib/store";
import { tableWrap } from "./table.css";
import { reqStatusRenderer } from "../_lib/reqStatusRenderer";

interface TableProps {
  session: Session;
  cols: ColDef[];
}

export default function Table({ session, cols }: TableProps) {
  const [colDefs] = useState(
    cols.map((col) => {
      if (col.field === "상태 구분") {
        col.cellRenderer = reqStatusRenderer;
      }
      return col;
    }),
  );

  const transactionStore = useTransactionStore();

  const { data } = useQuery({
    queryKey: ["TBW_001000_Q01", transactionStore],
    queryFn: async () => {
      const TBW_001000_Q01Res = await callTms<TBW_001000_Q01>({
        session,
        svcId: "TBW_001000_Q01",
        data: [
          session.user.corpCd,
          dateToString(transactionStore.mvioDd),
          transactionStore.instCd,
          transactionStore.mvioTp,
          transactionStore.mvioRmrkTp,
          transactionStore.rqstStatTp,
        ],
        pgSize: 20,
      });
      const TBW_001000_Q01Data = TBW_001000_Q01Res.svcRspnData || [];
      return TBW_001000_Q01Data;
    },
    select: (data) => {
      const result = data.map((item) => ({
        "회사 코드": item.F01,
        일자: stringToDate(item.F02),
        일련번호: item.F03,
        계좌번호: item.F04,
        "종목 코드": item.F05,
        "입출 구분": convertText(MVIO_TP_ITEM, item.F06),
        "적요 구분": convertText(MVIO_RMRK_ITEM, item.F07),
        수량: item.F08,
        "잔고 수량": item.F09,
        "상태 구분": item.F10,
        작업자: item.F11,
        "생성 일시": convertToStandardDateTime(item.F12),
        수정자: item.F13,
        "수정 일시": convertToStandardDateTime(item.F14),
      }));
      return result;
    },
    enabled: transactionStore.nonce > 0,
  });

  const rowData = transactionStore.nonce === 0 ? [] : data;

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
