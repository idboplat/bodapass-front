"use client";
import PagePagination from "@/app/_component/pagination/PagePagination";
import { MVIO_RMRK_ITEM, MVIO_TP_ITEM, RGST_STAT_ITEM, findEntity } from "@/app/_const/tp";
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
          transactionStore.instCd,
          findEntity(RGST_STAT_ITEM, transactionStore.rqstStatTp)?.[0] || "",
          dateToString(transactionStore.date[0]),
          dateToString(transactionStore.date[1]),
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
        "신청 일시": convertToStandardDateTime(item.F01),
        신청자: item.F02,
        "회사 코드": item.F03,
        "회사 명": item.F04,
        종목: item.F05,
        "입출고 구분": findEntity(MVIO_TP_ITEM, item.F06)?.[1] || "",
        "입출고 적요 구분": findEntity(MVIO_RMRK_ITEM, item.F07)?.[1] || "",
        수량: item.F08,
        "입출고 일자": stringToDate(item.F09),
        "입출고 일련번호": item.F10,
        "계좌 번호": item.F11,
        "잔고 수량": item.F12,
        "신청 상태": findEntity(RGST_STAT_ITEM, item.F13)?.[1] || "",
        "처리 일시": convertToStandardDateTime(item.F14),
        처리자: item.F15,
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
