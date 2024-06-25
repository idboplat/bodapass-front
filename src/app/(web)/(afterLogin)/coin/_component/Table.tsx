"use client";

import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { GRID_COLS } from "../_const/colum";
import { tableWrap } from "./table.css";
import classNames from "classnames";
import { useQuery } from "@tanstack/react-query";
import callTms from "@/model/callTms";
import { Session } from "next-auth";
import { TBW_001000_Q01 } from "@/type/api";

export default function Table({ session }: { session: Session }) {
  const [colDefs] = useState([...GRID_COLS]);

  const { data } = useQuery({
    queryKey: ["TBW_001000_Q01"],
    queryFn: async () => {
      const TBW_001000_Q01Res = await callTms<TBW_001000_Q01>({
        session,
        svcId: "TBW_001000_Q01",
        data: [session.user.corpCd],
        pgSize: 20,
      });
      const TBW_001000_Q01Data = TBW_001000_Q01Res.svcRspnData || [];
      return TBW_001000_Q01Data;
    },
    select: (data) => {
      const result = data.map((item) => ({
        회사코드: item.F01,
        "입출고 일자": item.F02,
        "입출고 일련번호": item.F03,
        종목코드: item.F04,
        "입출고 구분": item.F05,
        "입출고 수량": item.F06,
        "생성 작업 ID": item.F07,
        "생성 작업 일시": item.F08,
        "변경 작업 ID": item.F09,
        "변경 작업 일시": item.F10,
      }));
      return result;
    },
  });

  return (
    <div className={classNames("ag-theme-alpine", tableWrap)}>
      <AgGridReact
        columnDefs={colDefs}
        rowData={[]}
        overlayNoRowsTemplate={"<span>데이터가 없습니다.</span>"}
        headerHeight={28}
        rowHeight={28}
      />
    </div>
  );
}
