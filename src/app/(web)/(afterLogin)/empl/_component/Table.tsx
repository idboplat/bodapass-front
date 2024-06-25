"use client";

import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { GRID_COLS, RowData } from "../_const/colum";
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
          "", // 조회 시작 일자
          "", // 조회 종료 일자
        ],
      });
      const data = res.svcRspnData;
      return data || [];
    },
    select: (data) => {
      const result = data.map<RowData>((item) => ({
        사원코드: item.F01, //external_user_id
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
  });

  const onClick = (page: number) => {
    setDataId(page);
  };

  return (
    <>
      <div className={classNames("ag-theme-alpine", tableWrap)}>
        <AgGridReact
          columnDefs={colDefs}
          rowData={data}
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
