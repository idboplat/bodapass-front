"use client";
import PagePagination from "@/app/_component/pagination/PagePagination";
import { MVIO_TP_ITEM, RGST_STAT_ITEM, findEntity } from "@/app/_const/tp";
import { dateToString } from "@/app/_lib/dateFormatter";
import { convertToStandardDateTime, stringToDate } from "@/app/_lib/regexp";
import callTms from "@/model/callTms";
import { TBW_001000_R01 } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import classNames from "classnames";
import { Session } from "next-auth";
import { useState } from "react";
import { Meta } from "../_const/meta";
import { RowData } from "../_const/row.type";
import { useTransactionClientStore } from "../_lib/store";
import ReqStatus from "./ReqStatus";
import { tableWrap } from "./table.css";
import { sortDecimal } from "@/app/_lib/numberFormatter";

const PAGE_SIZE = 20;

interface TableProps {
  session: Session;
  meta: Meta;
}

export default function Table({ session, meta }: TableProps) {
  const [total, setTotal] = useState(-1);
  const [colDefs] = useState(
    meta.cols.map((col) => {
      if (col.field === "신청 상태") {
        col.cellRenderer = ({ node }: ICellRendererParams<RowData, undefined, undefined>) => {
          const { data, rowIndex } = node;
          const isRender = data && rowIndex !== null;
          return isRender && <ReqStatus index={rowIndex} data={data} session={session} />;
        };
      }
      return col;
    }),
  );

  const transactionStore = useTransactionClientStore();

  const { data } = useQuery({
    queryKey: ["TBW_001000_R01", transactionStore],
    queryFn: async () => {
      const res = await callTms<TBW_001000_R01>({
        session,
        svcId: "TBW_001000_R01",
        data: [
          session.user.corpCd,
          transactionStore.instCd,
          findEntity(MVIO_TP_ITEM, transactionStore.mvioTp)?.[0] || "",
          findEntity(RGST_STAT_ITEM, transactionStore.rqstStatTp)?.[0] || "",
          dateToString(transactionStore.date[0]),
          dateToString(transactionStore.date[1]),
        ],
        pgSn: transactionStore.page,
        pgSize: PAGE_SIZE,
      });
      setTotal(() => res.svcTotRecCnt);
      const data = res.svcRspnData || [];
      return data;
    },
    select: (data) => {
      const result = data.map((item) => ({
        "신청 일시": convertToStandardDateTime(item.F01),
        신청인: item.F02,
        "회사 코드": item.F03,
        "회사 명": item.F04,
        "사용자 ID": item.F05,
        종목: item.F06,
        "입/출": findEntity(MVIO_TP_ITEM, item.F07)?.[1] || "",
        수량: sortDecimal({ num: item.F08, decimalLength: 2, requireComma: true }),
        "잔고 수량": item.F09,
        "신청 상태": findEntity(RGST_STAT_ITEM, item.F10)?.[1] || "",
        "계좌 번호": item.F11,
        "입출고 일자": stringToDate(item.F12),
        "입출고 일련번호": item.F13,
        "승인 일시": convertToStandardDateTime(item.F14),
        승인인: item.F15,
      }));
      return result;
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
          pgSize={PAGE_SIZE}
          onChange={transactionStore.actions.setPage}
        />
      )}
    </>
  );
}
