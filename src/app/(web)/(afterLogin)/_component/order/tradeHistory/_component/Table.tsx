"use client";
import PagePagination from "@/app/_component/pagination/PagePagination";
import { AKPRC_TP, BYSL_TP_ITEM, findEntity, ORDR_PRC_TP } from "@/app/_const/tp";
import { dateToString } from "@/app/_lib/dateFormatter";
import callTms from "@/model/callTms";
import { TBW_006000_Q03 } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import classNames from "classnames";
import { Session } from "next-auth";
import { useMemo, useState } from "react";
import { useOrderHistoryStore } from "../_lib/store";
import { tableWrap } from "./table.css";
import { convertToStandardDateTime } from "@/app/_lib/regexp";
import { sortDecimal } from "@/app/_lib/numberFormatter";
import { ColDef } from "ag-grid-community";
import { COLUMN_SIZE, COLUMN_STYLE } from "@/app/_const/cols";
import { useStore } from "zustand";
import { useApp } from "@/app/_lib/appStore";

const PAGE_SIZE = 20;

interface TableProps {
  session: Session;
}

export default function Table({ session }: TableProps) {
  const app = useApp();
  const fiat = useStore(app, (store) => store.fiat);
  const [total, setTotal] = useState(-1);
  const orderHistoryStore = useOrderHistoryStore();

  const { data } = useQuery({
    queryKey: ["TBW_006000_Q03", orderHistoryStore, fiat],
    queryFn: async () => {
      const TBW_006000_R01Res = await callTms<TBW_006000_Q03>({
        session,
        svcId: "TBW_006000_Q03",
        data: [
          session.user.corpCd,
          orderHistoryStore.instCd,
          dateToString(orderHistoryStore.date[0]),
          dateToString(orderHistoryStore.date[1]),
          findEntity(BYSL_TP_ITEM, orderHistoryStore.mvioTp)?.[0] || "",
          fiat,
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
        "체결 일시": convertToStandardDateTime(item.F01),
        "회사 코드": item.F02,
        "회사 명": item.F03,
        "계좌 번호": item.F04,
        "사용자 ID": item.F05,
        종목: item.F06,
        레버리지: item.F07,
        "매수/매도": findEntity(BYSL_TP_ITEM, item.F08)?.[1] || "",
        체결가: sortDecimal({
          decimalLength: parseInt(item.F14),
          num: item.F09,
          requireComma: true,
        }),
        "체결 수량": sortDecimal({
          decimalLength: parseInt(item.F15),
          num: item.F10,
          requireComma: true,
        }),
        진입가: sortDecimal({
          decimalLength: parseInt(item.F14),
          num: item.F11,
          requireComma: true,
        }),
        수수료: sortDecimal({
          decimalLength: parseInt(item.F15),
          num: item.F12,
          requireComma: true,
        }),
        법정화폐수수료: sortDecimal({
          num: (parseFloat(item.F12) * parseFloat(item.F20)).toString(),
          decimalLength: 0,
          requireComma: true,
        }),
        손익: sortDecimal({
          decimalLength: 2,
          num: item.F13,
          requireComma: true,
        }),
        법정화폐손익: sortDecimal({
          num: (parseFloat(item.F13) * parseFloat(item.F20)).toString(),
          decimalLength: 0,
          requireComma: true,
        }),
        "가격 소수점": item.F17,
        "수량 소수점": item.F18,
        환율: item.F20,
      }));
      return result;
    },
    enabled: orderHistoryStore.nonce > 0,
  });

  const colDefs = useMemo<ColDef[]>(() => {
    return [
      {
        field: "체결 일시",
        width: COLUMN_SIZE.xl,
        resizable: true,
        editable: true,
      },
      {
        field: "회사 코드",
        width: COLUMN_SIZE.md,
        resizable: true,
        editable: true,
      },
      {
        field: "회사 명",
        width: COLUMN_SIZE.lg,
        resizable: true,
        editable: true,
        cellStyle: COLUMN_STYLE.left,
      },
      {
        field: "사용자 ID",
        width: COLUMN_SIZE.xl,
        resizable: true,
        editable: true,
        cellStyle: COLUMN_STYLE.left,
      },
      {
        field: "종목",
        width: COLUMN_SIZE.sm,
        resizable: true,
        editable: true,
        cellStyle: COLUMN_STYLE.left,
      },
      {
        field: "레버리지",
        width: COLUMN_SIZE.sm,
        resizable: true,
        editable: true,
        cellStyle: COLUMN_STYLE.right,
      },
      {
        field: "매수/매도",
        width: COLUMN_SIZE.md,
        resizable: true,
        editable: true,
      },
      {
        field: "체결가",
        width: COLUMN_SIZE.xl,
        resizable: true,
        editable: true,
        cellStyle: COLUMN_STYLE.right,
      },
      {
        field: "체결 수량",
        width: COLUMN_SIZE.xl,
        resizable: true,
        editable: true,
        cellStyle: COLUMN_STYLE.right,
      },
      {
        field: "진입가",
        width: COLUMN_SIZE.xl,
        resizable: true,
        editable: true,
        cellStyle: COLUMN_STYLE.right,
      },
      {
        field: "수수료",
        width: COLUMN_SIZE.xl,
        resizable: true,
        editable: true,
        cellStyle: COLUMN_STYLE.right,
      },
      {
        field: "법정화폐수수료",
        width: COLUMN_SIZE.xl,
        resizable: true,
        editable: true,
        cellStyle: COLUMN_STYLE.right,
        headerValueGetter: () => `수수료 (${fiat})`,
      },
      {
        field: "손익",
        width: COLUMN_SIZE.xl,
        resizable: true,
        editable: true,
        cellStyle: COLUMN_STYLE.right,
      },
      {
        field: "법정화폐손익",
        width: COLUMN_SIZE.xl,
        resizable: true,
        editable: true,
        cellStyle: COLUMN_STYLE.right,
        headerValueGetter: () => `손익 (${fiat})`,
      },
    ];
  }, [fiat]);

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
