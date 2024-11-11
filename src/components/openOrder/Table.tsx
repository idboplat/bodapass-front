"use client";
import PagePagination from "@/components/common/pagination/PagiPagination";
import { GRID_COLS } from "@/constants/openOrder/colum";
import callTms from "@/libraries/callTms";
import { useOpenOrderStore } from "@/stores/openOrder";
import { TBW_006000_Q01 } from "@/types/api";
import { AKPRC_TP, BYSL_TP_ITEM, findEntity, ORDR_PRC_TP } from "@/types/tp";
import { dateToString } from "@/utils/dateFormatter";
import { sortDecimal } from "@/utils/numberFormatter";
import { convertToStandardDateTime } from "@/utils/regexp";
import { useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import classNames from "classnames";
import { Session } from "next-auth";
import { useState } from "react";
import css from "./Table.module.scss";

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
        "주문 일시": convertToStandardDateTime(item.F01),
        "회사 코드": item.F02,
        "회사 명": item.F03,
        "계좌 번호": item.F04,
        "사용자 ID": item.F05,
        종목: item.F06,
        레버리지: item.F07,
        "주문 구분": findEntity(AKPRC_TP, item.F08)?.[1] || "",
        "주문 가격 구분": findEntity(ORDR_PRC_TP, item.F09)?.[1] || "",
        "매수/매도": findEntity(BYSL_TP_ITEM, item.F10)?.[1] || "",
        "주문 가격": sortDecimal({
          decimalLength: parseInt(item.F17),
          num: item.F11,
          requireComma: true,
        }),
        "주문 수량": sortDecimal({
          decimalLength: parseInt(item.F18),
          num: item.F12,
          requireComma: true,
        }),
        "체결 수량": sortDecimal({
          decimalLength: parseInt(item.F18),
          num: item.F13,
          requireComma: true,
        }),
        "가격 소수점": item.F17,
        "수량 소수점": item.F18,
      }));
      return result;
    },
    enabled: openOrderStore.nonce > 0,
  });

  const rowData = openOrderStore.nonce === 0 ? [] : data;

  return (
    <>
      <div className={classNames("ag-theme-alpine", css.tableWrap)}>
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
