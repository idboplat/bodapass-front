"use client";

import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { GRID_COLS } from "../_const/colum";
import { tableWrap } from "./table.css";
import classNames from "classnames";
import PagePagination from "@web/(afterLogin)/_component/pagination/PagePagination";
import { useQuery } from "@tanstack/react-query";
import callTms from "@/model/callTms";
import { Session } from "next-auth";
import { TBW_000001_Q01 } from "@/type/api";

interface TableProps {
  session: Session;
}

export default function Table({ session }: TableProps) {
  const [colDefs] = useState([...GRID_COLS]);
  const [dataId, setDataId] = useState(11);

  const { data } = useQuery({
    queryKey: ["TBW_000001_Q01"],
    queryFn: async () => {
      const res = await callTms<TBW_000001_Q01>({
        svcId: "TBW_000001_Q01",
        session,
        data: [
          session.user.corpCd, //사원ID
          "", //입력 사원 ID
          "", //입력 사원명
        ],
      });

      const data = res.svcRspnData;
      return data || [];
    },
    select: (data) => {
      const result = data.map((item) => ({
        사원코드: item.F01,
        사원명: item.F02,
        회사코드: item.F05,
        등록일: item.F08,
        최근접속일시: "", //??
      }));
      return result;
    },
  });

  const onClick = (page: number) => {
    setDataId(page);
  };

  console.log("data", data);

  return (
    <>
      <div className={classNames("ag-theme-alpine", tableWrap)}>
        <AgGridReact
          columnDefs={colDefs}
          rowData={[]}
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
