"use client";
import { BYSL_TP_ITEM, findEntity } from "@/app/_const/tp";
import { dateToString } from "@/app/_lib/dateFormatter";
import { convertToStandardDateTime, stringToDate } from "@/app/_lib/regexp";
import callTms from "@/model/callTms";
import { TBW_006000_Q01 } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import classNames from "classnames";
import { Session } from "next-auth";
import { useState } from "react";
import { GRID_COLS } from "../_const/colum";
import { useOpenOrderStore } from "../_lib/store";
import { tableWrap } from "./table.css";
import PagePagination from "@/app/_component/pagination/PagePagination";

const PAGE_SIZE = 20;

interface TableProps {
  session: Session;
}

export default function Table({ session }: TableProps) {
  const [colDefs] = useState([...GRID_COLS]);
  const [total, setTotal] = useState(-1);
  const openOrderStore = useOpenOrderStore();

  const { data } = useQuery({
    queryKey: ["TBW_006000_Q01", openOrderStore],
    queryFn: async () => {
      const TBW_006000_Q01Res = await callTms<TBW_006000_Q01>({
        session,
        svcId: "TBW_006000_Q01",
        data: [
          session.user.corpCd,
          openOrderStore.instCd,
          dateToString(openOrderStore.date[0]),
          dateToString(openOrderStore.date[1]),
          findEntity(BYSL_TP_ITEM, openOrderStore.byslTp)?.[0] || "",
        ],
        pgSize: PAGE_SIZE,
        pgSn: openOrderStore.page,
      });
      setTotal(() => TBW_006000_Q01Res.svcTotRecCnt);
      const TBW_006000_Q01Data = TBW_006000_Q01Res.svcRspnData || [];
      return TBW_006000_Q01Data;
    },
    select: (data) => {
      const result = data.map((item) => ({
        "회사 코드": item.F01,
        "주문 일자": stringToDate(item.F02),
        "주문 일련번호": item.F03,
        "계좌 번호": item.F04,
        "종목 코드": item.F05,
        "원 주문 일자": stringToDate(item.F06),
        "원 주문 일련번호": item.F07,
        "최초 주문 일자": stringToDate(item.F08),
        "최초 주문 일련번호": item.F09,
        "주문 상태 구분": item.F10,
        "주문 구분": item.F11,
        "호가 구분": item.F12,
        "매수매도 구분": findEntity(BYSL_TP_ITEM, item.F13)?.[1] || "",
        "주문 가격 구분": item.F14,
        "체결 조건 구분": item.F15,
        "레버리지 크기": item.F16,
        "조건 가격": item.F17,
        "주문 가격": item.F18,
        "주문 수량": item.F19,
        "정정 수량": item.F20,
        "취소 수량": item.F21,
        "체결 수량": item.F22,
        "주문 잔량": item.F23,
        "취소 확인 수량": item.F24,
        "증거금 가격": item.F25,
        "가격 종목 코드": item.F26,
        "수수료 종목 코드": item.F27,
        "주문 만기 코드": item.F28,
        "주문 만기 일자": stringToDate(item.F29),
        "주문 종료 구분": item.F30,
        "체결 종료 여부": item.F31,
        "주문 접수 일시": convertToStandardDateTime(item.F32),
        "전문 일자": stringToDate(item.F33),
        "전문 일련번호": item.F34,
        "외부 계좌 번호": item.F35,
        "외부 주문 번호": item.F36,
        "외부 원 주문 번호": item.F37,
        "거부 사유": item.F38,
        생성자: item.F39,
        "생성 일시": convertToStandardDateTime(item.F40),
        수정자: item.F41,
        "수정 일시": convertToStandardDateTime(item.F42),
      }));
      return result;
    },
    enabled: openOrderStore.nonce > 0,
  });

  const rowData = openOrderStore.nonce === 0 ? [] : data;

  return (
    <>
      <div className={classNames("ag-theme-alpine", tableWrap)}>
        <AgGridReact
          columnDefs={colDefs}
          rowData={rowData}
          overlayNoRowsTemplate={
            openOrderStore.nonce === 0 ? "<span></span>" : "<span>데이터가 없습니다.</span>"
          }
          headerHeight={28}
          rowHeight={28}
        />
      </div>
      {total !== -1 && (
        <PagePagination
          currentPage={openOrderStore.page}
          totalCnt={total}
          pgSize={PAGE_SIZE}
          groupSize={10}
          onChange={openOrderStore.actions.setPage}
        />
      )}
    </>
  );
}
