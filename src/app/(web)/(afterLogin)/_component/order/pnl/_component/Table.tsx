"use client";
import { MVIO_RMRK_ITEM, MVIO_TP_ITEM, RGST_STAT_ITEM, findEntity } from "@/app/_const/tp";
import { dateToString } from "@/app/_lib/dateFormatter";
import { convertToStandardDateTime, stringToDate } from "@/app/_lib/regexp";
import callTms from "@/model/callTms";
import { TBW_006000_R01 } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import classNames from "classnames";
import { Session } from "next-auth";
import { useMemo, useState } from "react";
import { usePnlStore } from "../_lib/store";
import css from "./Table.module.scss";
import PagePagination from "@/app/_component/pagination/PagiPagination";
import { sortDecimal } from "@/app/_lib/numberFormatter";
import { COLUMN_SIZE, COLUMN_STYLE } from "@/app/_const/cols";
import { ColDef } from "ag-grid-community";
import { useApp } from "@/app/_lib/appStore";
import { useStore } from "zustand";

const PAGE_SIZE = 20;

interface TableProps {
  session: Session;
}

export default function Table({ session }: TableProps) {
  const app = useApp();
  const fiat = useStore(app, (store) => store.fiat);
  const [total, setTotal] = useState(-1);
  const pnlStore = usePnlStore();

  const { data } = useQuery({
    queryKey: ["TBW_006000_R01", pnlStore, fiat],
    queryFn: async () => {
      const TBW_006000_R01Res = await callTms<TBW_006000_R01>({
        session,
        svcId: "TBW_006000_R01",
        data: [
          session.user.corpCd,
          pnlStore.instCd,
          findEntity(MVIO_TP_ITEM, pnlStore.mvioTp)?.[0] || "",
          dateToString(pnlStore.date[0]),
          dateToString(pnlStore.date[1]),
          fiat,
        ],
        pgSize: PAGE_SIZE,
        pgSn: pnlStore.page,
      });
      setTotal(() => TBW_006000_R01Res.svcTotRecCnt);
      const TBW_006000_R01Data = TBW_006000_R01Res.svcRspnData || [];
      return TBW_006000_R01Data;
    },
    select: (data) => {
      const result = data.map((item) => ({
        "손익 일시": convertToStandardDateTime(item.F01),
        "회사 코드": item.F02,
        "회사 명": item.F03,
        "계좌 번호": item.F04,
        "사용자 ID": item.F05,
        종목: item.F06,
        "적요 구분": findEntity(MVIO_RMRK_ITEM, item.F07)?.[1] || "",
        수량: item.F08,
        법정화폐수량: sortDecimal({
          num: (parseFloat(item.F08) * parseFloat(item.F11)).toString(),
          decimalLength: 0,
          requireComma: true,
        }),
        "체결 일자": stringToDate(item.F09),
        "체결 번호": item.F10,
        환율: item.F11,
      }));
      return result;
    },
    enabled: pnlStore.nonce > 0,
  });

  const colDefs = useMemo<ColDef[]>(() => {
    return [
      {
        field: "손익 일시",
        width: COLUMN_SIZE.xl,
        resizable: true,
        editable: true,
      },
      {
        field: "회사 코드",
        width: COLUMN_SIZE.sm,
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
        field: "계좌 번호",
        width: COLUMN_SIZE.lg,
        resizable: true,
        editable: true,
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
      },
      {
        field: "적요 구분",
        width: COLUMN_SIZE.md,
        resizable: true,
        editable: true,
      },
      {
        field: "수량",
        width: COLUMN_SIZE.xl,
        resizable: true,
        editable: true,
        cellStyle: COLUMN_STYLE.right,
      },
      {
        field: "법정화폐수량",
        width: COLUMN_SIZE.xl,
        resizable: true,
        editable: true,
        cellStyle: COLUMN_STYLE.right,
        headerValueGetter: () => `수량 (${fiat})`,
      },
      {
        field: "체결 일자",
        width: COLUMN_SIZE.md,
        resizable: true,
        editable: true,
      },
      {
        field: "체결 번호",
        width: COLUMN_SIZE.sm,
        resizable: true,
        editable: true,
        cellStyle: COLUMN_STYLE.right,
      },
    ];
  }, [fiat]);

  const rowData = pnlStore.nonce === 0 ? [] : data;

  return (
    <>
      <div className={classNames("ag-theme-alpine", css.tableWrap)}>
        <AgGridReact
          columnDefs={colDefs}
          rowData={rowData}
          overlayNoRowsTemplate={
            pnlStore.nonce === 0 ? "<span></span>" : "<span>데이터가 없습니다.</span>"
          }
          headerHeight={28}
          rowHeight={28}
        />
      </div>
      {total !== -1 && (
        <PagePagination
          currentPage={pnlStore.page}
          totalCnt={total}
          pgSize={PAGE_SIZE}
          groupSize={10}
          onChange={pnlStore.actions.setPage}
        />
      )}
    </>
  );
}
