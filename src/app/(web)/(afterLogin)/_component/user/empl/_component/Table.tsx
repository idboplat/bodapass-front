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
import { useEmplStore } from "../_lib/store";
import { tableWrap } from "./table.css";

interface TableProps {
  session: Session;
}

export default function Table({ session }: TableProps) {
  const [colDefs] = useState([...GRID_COLS]);
  const [dataId, setDataId] = useState(11);
  const emplStore = useEmplStore();

  const { data } = useQuery({
    queryKey: ["TBW_000001_Q01", emplStore],
    queryFn: async () => {
      const res = await callTms<TBW_000001_Q01>({
        svcId: "TBW_000001_Q01",
        session,
        data: [
          session.user.corpCd, //사원ID
          emplStore.emplId, //입력 사원 ID
          emplStore.emplName, //입력 사원명
        ],
      });
      const data = res.svcRspnData;
      return data || [];
    },
    select: (data) => {
      const result = data.map<RowData>((item) => ({
        사원ID: item.F01,
        사원명: item.F02,
        회사코드: item.F03,
        회사명: item.F04,
        생성작업ID: item.F05,
        생성작업일시: item.F06,
        변경작업ID: item.F07,
        변경작업일시: item.F08,
      }));
      return result;
    },
    enabled: emplStore.nonce > 0,
  });

  const onClick = (page: number) => {
    setDataId(page);
  };

  const rowData = emplStore.nonce === 0 ? [] : data;
  return (
    <>
      <div className={classNames("ag-theme-alpine", tableWrap)}>
        <AgGridReact
          columnDefs={colDefs}
          rowData={rowData}
          overlayNoRowsTemplate={"<span>데이터가 없습니다.</span>"}
          headerHeight={28}
          rowHeight={28}
        />
      </div>
      <PagePagination
        currentCount={dataId}
        count={1000}
        pageSize={10}
        length={10}
        onChange={onClick}
      />
    </>
  );
}
