"use client";
import PagePagination from "@/app/_component/pagination/PagePagination";
import { MVIO_RMRK_ITEM, MVIO_TP_ITEM, convertText } from "@/app/_const/tp";
import { dateToString } from "@/app/_lib/dateFormatter";
import { convertToStandardDateTime, stringToDate } from "@/app/_lib/regexp";
import callTms from "@/model/callTms";
import { TBW_001000_Q01 } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import classNames from "classnames";
import { Session } from "next-auth";
import { useState } from "react";
import { Meta } from "../_const/meta";
import { RowData } from "../_const/row.type";
import { useTransactionCorpStore } from "../_lib/store";
import ReqStatus from "./ReqStatus";
import { tableWrap } from "./table.css";

const PAGE_SIZE = 20;

interface TableProps {
  session: Session;
  meta: Meta;
}

export default function Table({ session, meta }: TableProps) {
  const [total, setTotal] = useState(-1);
  const [colDefs] = useState(
    meta.cols.map((col) => {
      if (col.field === "상태 구분") {
        col.cellRenderer = ({ node }: ICellRendererParams<RowData, undefined, undefined>) => {
          const { data, rowIndex } = node;
          const isRender = data && rowIndex !== null;
          return isRender && <ReqStatus index={rowIndex} data={data} session={session} />;
        };
      }
      return col;
    }),
  );

  const transactionStore = useTransactionCorpStore();

  const { data } = useQuery({
    queryKey: ["TBW_001000_Q01", transactionStore],
    queryFn: async () => {
      const res = await callTms<TBW_001000_Q01>({
        session,
        svcId: "TBW_001000_Q01",
        data: [
          session.user.corpCd,
          dateToString(transactionStore.date[0]),
          transactionStore.instCd,
          transactionStore.mvioTp,
          transactionStore.mvioRmrkTp,
          transactionStore.rqstStatTp,
        ],
        pgSize: PAGE_SIZE,
        pgSn: transactionStore.page,
      });
      setTotal(() => res.svcTotRecCnt);
      const data = res.svcRspnData || [];
      return data;
    },
    select: (data) => {
      const rowData = data.map((item) => ({
        "회사 코드": item.F01,
        회사: item.F02,
        일자: stringToDate(item.F03),
        일련번호: item.F04,
        계좌번호: item.F05,
        "종목 코드": item.F06,
        "입출 구분": convertText(MVIO_TP_ITEM, item.F07),
        "적요 구분": convertText(MVIO_RMRK_ITEM, item.F08),
        수량: item.F09,
        "잔고 수량": item.F10,
        "상태 구분": item.F11,
        취급인: item.F12,
        "생성 일시": convertToStandardDateTime(item.F13),
        수정인: item.F14,
        "수정 일시": convertToStandardDateTime(item.F15),
      }));
      return rowData;
    },
    enabled: transactionStore.nonce > 0,
  });

  const rowData = transactionStore.nonce === 0 ? [] : data;

  // 클립보드 복사 이벤트
  // const onCellKeyDown = (params: CellKeyDownEvent) => {
  //   const keyboardEvent = params.event as KeyboardEvent;
  //   if (keyboardEvent.ctrlKey && keyboardEvent.key === "c") {
  //     const cellValue = params.value;
  //     navigator.clipboard.writeText(cellValue);
  //   }
  // };

  return (
    <>
      <div className={classNames("ag-theme-alpine", tableWrap)}>
        <AgGridReact
          columnDefs={colDefs}
          rowData={rowData}
          overlayNoRowsTemplate={
            transactionStore.nonce === 0 ? "<span></span>" : "<span>데이터가 없습니다.</span>"
          }
          headerHeight={28}
          rowHeight={28}
          // onCellKeyDown={onCellKeyDown}
        />
      </div>
      {total !== -1 && (
        <PagePagination
          currentPage={transactionStore.page}
          totalCnt={total}
          pgSize={20}
          onChange={transactionStore.actions.setPage}
        />
      )}
    </>
  );
}
