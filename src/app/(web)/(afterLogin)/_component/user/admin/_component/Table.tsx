"use client";
import callTms from "@/model/callTms";
import { TBW_000001_Q01 } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import PagePagination from "@/app/_component/pagination/PagePagination";
import { AgGridReact } from "ag-grid-react";
import classNames from "classnames";
import { Session } from "next-auth";
import { useState } from "react";
import { GRID_COLS, RowData } from "../_const/colum";
import { useAdminStore } from "../_lib/store";
import { tableWrap } from "./table.css";
import { convertToStandardDateTime } from "@/app/_lib/regexp";

const PAGE_SIZE = 20;

interface TableProps {
  session: Session;
}

export default function Table({ session }: TableProps) {
  const [colDefs] = useState([...GRID_COLS]);
  const [total, setTotal] = useState(-1);
  const adminStore = useAdminStore();

  const { data } = useQuery({
    queryKey: ["TBW_000001_Q01", adminStore],
    queryFn: async () => {
      const res = await callTms<TBW_000001_Q01>({
        svcId: "TBW_000001_Q01",
        session,
        data: [
          session.user.corpCd,
          adminStore.emplId, //사원ID
          adminStore.extnUserId, //입력 사원 ID
          adminStore.emplName, //입력 사원명
        ],
        pgSize: PAGE_SIZE,
        pgSn: adminStore.page,
      });
      setTotal(() => res.svcTotRecCnt);
      const data = res.svcRspnData || [];
      return data;
    },
    select: (data) => {
      const rowData = data.map<RowData>((item) => ({
        "관리자 코드": item.F01,
        "관리자 ID": item.F02,
        "관리자 명": item.F03,
        "회사 코드": item.F04,
        "회사 명": item.F05,
        생성자: item.F06,
        "생성 일시": convertToStandardDateTime(item.F07),
      }));
      return rowData;
    },
    enabled: adminStore.nonce > 0,
  });

  const rowData = adminStore.nonce === 0 ? [] : data;

  return (
    <>
      <div className={classNames("ag-theme-alpine", tableWrap)}>
        <AgGridReact
          columnDefs={colDefs}
          rowData={rowData}
          overlayNoRowsTemplate={
            adminStore.nonce === 0 ? "<span></span>" : "<span>데이터가 없습니다.</span>"
          }
          headerHeight={28}
          rowHeight={28}
        />
      </div>
      {total !== -1 && (
        <PagePagination
          currentPage={adminStore.page}
          totalCnt={total}
          pgSize={PAGE_SIZE}
          groupSize={10}
          onChange={adminStore.actions.setPage}
        />
      )}
    </>
  );
}
