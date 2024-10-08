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
import { useState } from "react";
import { GRID_COLS } from "../_const/colum";
import { usePnlStore } from "../_lib/store";
import { tableWrap } from "./table.css";
import PagePagination from "@/app/_component/pagination/PagePagination";
import { sortDecimal } from "@/app/_lib/numberFormatter";

const PAGE_SIZE = 20;

interface TableProps {
  session: Session;
}

export default function Table({ session }: TableProps) {
  const [colDefs] = useState([...GRID_COLS]);
  const [total, setTotal] = useState(-1);
  const pnlStore = usePnlStore();

  const { data } = useQuery({
    queryKey: ["TBW_006000_R01", pnlStore],
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
          "KRW",
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
        "수량(KRW)": sortDecimal({
          num: (parseFloat(item.F08) * parseFloat(item.F11)).toString(),
          decimalLength: 0,
          requireComma: true,
        }),
        "체결 일자": stringToDate(item.F09),
        "체결 번호": item.F10,
        환율: item.F11,
        화폐단위: "KRW",
      }));
      return result;
    },
    enabled: pnlStore.nonce > 0,
  });

  const rowData = pnlStore.nonce === 0 ? [] : data;

  return (
    <>
      <div className={classNames("ag-theme-alpine", tableWrap)}>
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
