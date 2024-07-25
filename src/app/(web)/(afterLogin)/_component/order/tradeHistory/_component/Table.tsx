"use client";
import PagePagination from "@/app/_component/pagination/PagePagination";
import { BYSL_TP_ITEM, findEntity } from "@/app/_const/tp";
import { dateToString } from "@/app/_lib/dateFormatter";
import callTms from "@/model/callTms";
import { TBW_006000_Q03 } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import classNames from "classnames";
import { Session } from "next-auth";
import { useState } from "react";
import { GRID_COLS } from "../_const/colum";
import { useOrderHistoryStore } from "../_lib/store";
import { tableWrap } from "./table.css";
import { convertToStandardDateTime, stringToDate } from "@/app/_lib/regexp";

const PAGE_SIZE = 20;

interface TableProps {
  session: Session;
}

export default function Table({ session }: TableProps) {
  const [colDefs] = useState([...GRID_COLS]);
  const [total, setTotal] = useState(-1);
  const orderHistoryStore = useOrderHistoryStore();

  const { data } = useQuery({
    queryKey: ["TBW_006000_Q03", orderHistoryStore],
    queryFn: async () => {
      const TBW_006000_R01Res = await callTms<TBW_006000_Q03>({
        session,
        svcId: "TBW_006000_Q03",
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
      const result = data.map((item) => ({
        "회사 코드": item.F01,
        "체결 일자": stringToDate(item.F02),
        "체결 일련번호": item.F03,
        "주문 일자": stringToDate(item.F04),
        "주문 일련번호": item.F05,
        "계좌 번호": item.F06,
        "종목 코드": item.F07,
        "매수매도 구분": findEntity(BYSL_TP_ITEM, item.F08)?.[1] || "",
        "체결 가격": item.F09,
        "체결 수량": item.F10,
        "진입 가격": item.F11,
        "청산 수량": item.F12,
        "청산 손익": item.F13,
        "고객 수수료": item.F14,
        "체결 일시": convertToStandardDateTime(item.F15),
        "전문 일자": stringToDate(item.F16),
        "전문 일련번호": item.F17,
        "매칭엔진 ID": item.F18,
        "외부 계좌 번호": item.F19,
        "외부 체결 그룹 번호": item.F20,
        "외부 체결 번호": item.F21,
        "외부 주문 번호": item.F22,
        "MAKER 주문 여부": item.F23,
        "생성 작업 ID": item.F24,
        "생성 작업 일시": convertToStandardDateTime(item.F25),
        "변경 작업 ID": item.F26,
        "변경 작업 일시": convertToStandardDateTime(item.F27),
      }));
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
