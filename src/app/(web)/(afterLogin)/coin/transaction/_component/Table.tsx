"use client";
import callTms from "@/model/callTms";
import { TBW_001000_Q01 } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import classNames from "classnames";
import { Session } from "next-auth";
import { useState } from "react";
import { GRID_COLS, RowData } from "../_const/colum";
import { useTransactionStore } from "../_lib/store";
import ReqStatus from "./ReqStatus";
import { tableWrap } from "./table.css";
import { getMvioRmrkTp, getMvioTp } from "@/app/_const/tp";
import { dateToString } from "@/app/_lib/dateFormatter";

interface TableProps {
  session: Session;
}

export default function Table({ session }: TableProps) {
  const [colDefs] = useState(() => {
    const cols = [...GRID_COLS];
    cols[9].cellRenderer = ({ node }: ICellRendererParams<RowData, undefined, undefined>) => {
      const { data, rowIndex } = node;
      const isRender = data && rowIndex !== null;
      return isRender ? <ReqStatus index={rowIndex} data={data} /> : null;
    };
    return cols;
  });

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
        회사코드: item.F01,
        "입출고 일자": item.F02,
        "입출고 일련번호": item.F03,
        "계좌 번호": item.F04,
        "종목 코드": item.F05,
        "입출고 구분": getMvioTp(item.F06),
        "입출고 적요 구분": getMvioRmrkTp(item.F07),
        "입출고 수량": item.F08,
        "잔고 수량": item.F09,
        "신청 상태 구분": item.F10,
        "생성 작업 ID": item.F11,
        "생성 작업 일시": item.F12,
        "변경 작업 ID": item.F13,
        "변경 작업 일시": item.F14,
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
