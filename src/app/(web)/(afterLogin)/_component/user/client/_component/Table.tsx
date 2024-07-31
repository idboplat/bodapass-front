"use client";

import { Session } from "next-auth";
import { useState } from "react";
import { GRID_COLS, RowData } from "../_const/colum";
import { useClientStore } from "../_lib/store";
import { useQuery } from "@tanstack/react-query";
import callTms from "@/model/callTms";
import { TBW_000001_S01 } from "@/type/api";
import { convertToStandardDateTime } from "@/app/_lib/regexp";
import classNames from "classnames";
import { AgGridReact } from "ag-grid-react";
import { tableWrap } from "./table.css";
import PagePagination from "@/app/_component/pagination/PagePagination";

const PAGE_SIZE = 20;

interface TableProps {
  session: Session;
}

export default function Table({ session }: TableProps) {
  const [colDefs] = useState([...GRID_COLS]);
  const [total, setTotal] = useState(-1);
  const clientStore = useClientStore();

  const { data } = useQuery({
    queryKey: ["TBW_000001_S01", clientStore],
    queryFn: async () => {
      const res = await callTms<TBW_000001_S01>({
        svcId: "TBW_000001_S01",
        session,
        data: [session.user.corpCd, clientStore.extnUserId],
        pgSize: PAGE_SIZE,
        pgSn: clientStore.page,
      });
      setTotal(() => res.svcTotRecCnt);
      const data = res.svcRspnData || [];
      return data;
    },
    select: (data) => {
      const result = data.map<RowData>((item) => ({
        "생성 일시": convertToStandardDateTime(item.F01),
        // "사용자 ID" : item.F02,
        "사용자 ID": item.F03,
        "접근 유형": item.F04 === "1" ? "사용가능" : "사용제한",
        "회사 코드": item.F05,
        "회사 명": item.F06,
        "상위 회사 코드": item.F07,
        "상위 회사 명": item.F08,
        생성인: item.F09,
      }));
      return result;
    },
    enabled: clientStore.nonce > 0,
  });

  const rowData = clientStore.nonce === 0 ? [] : data;

  return (
    <>
      <div className={classNames("ag-theme-alpine", tableWrap)}>
        <AgGridReact
          columnDefs={colDefs}
          rowData={rowData}
          overlayNoRowsTemplate={
            clientStore.nonce === 0 ? "<span></span>" : "<span>데이터가 없습니다.</span>"
          }
          headerHeight={28}
          rowHeight={28}
        />
      </div>
      {total !== -1 && (
        <PagePagination
          currentPage={clientStore.page}
          totalCnt={total}
          pgSize={PAGE_SIZE}
          groupSize={10}
          onChange={clientStore.actions.setPage}
        />
      )}
    </>
  );
}
