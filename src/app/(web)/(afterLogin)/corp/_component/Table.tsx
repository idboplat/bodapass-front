"use client";

import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { GRID_COLS } from "../_const/colum";
import { tableWrap } from "./table.css";
import classNames from "classnames";
import { useQuery } from "@tanstack/react-query";
import callTms from "@/model/callTms";
import { TBW_000000_R01 } from "@/type/api";
import { Session } from "next-auth";
import { useCorpStore } from "../_lib/store";

export default function Table({ session }: { session: Session }) {
  const [colDefs] = useState([...GRID_COLS]);
  const corp = useCorpStore();

  const { data } = useQuery({
    queryKey: ["TBW_000000_R01"],
    queryFn: async () => {
      const TBW_000000_R01Res = await callTms<TBW_000000_R01>({
        session,
        svcId: "TBW_000000_R01",
        // data: [session.user.corpCd, corp.corpNm, corp.corpGrpTp || ""],
        data: [session.user.corpCd, "", ""],
        pgSize: 20,
      });
      const TBW_000000_R01Data = TBW_000000_R01Res.svcRspnData || [];
      return TBW_000000_R01Data;
    },
    select: (data) => {
      const result = data.map((item) => ({
        회사코드: item.F01,
        회사명: item.F02,
        "회사 그룹 구분": item.F03,
        "주 회사코드": item.F04,
        "생성 작업 ID": item.F05,
        "생성 작업 일시": item.F06,
        "변경 작업 ID": item.F07,
        "변경 작업 일시": item.F08,
      }));
      return result;
    },
  });

  console.log("TBW_000000_R01 data ::::: ", data);

  return (
    <div className={classNames("ag-theme-alpine", tableWrap)}>
      <AgGridReact
        columnDefs={colDefs}
        rowData={data}
        overlayNoRowsTemplate={"<span>데이터가 없습니다.</span>"}
        headerHeight={28}
        rowHeight={28}
      />
    </div>
  );
}
