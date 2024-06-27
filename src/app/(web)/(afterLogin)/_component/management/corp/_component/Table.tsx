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
import { CORP_GRP_ITEM, convertText } from "@/app/_const/tp";
import { convertToStandardDateTime } from "@/app/_lib/regexp";

interface TableProps {
  session: Session;
}

export default function Table({ session }: TableProps) {
  const [colDefs] = useState([...GRID_COLS]);
  const corpStore = useCorpStore();

  const { data } = useQuery({
    queryKey: ["TBW_000000_R01", corpStore],
    queryFn: async () => {
      const TBW_000000_R01Res = await callTms<TBW_000000_R01>({
        session,
        svcId: "TBW_000000_R01",
        data: [session.user.corpCd, corpStore.corpNm, corpStore.corpGrpTp || ""],
        pgSize: 20,
      });
      const TBW_000000_R01Data = TBW_000000_R01Res.svcRspnData || [];
      return TBW_000000_R01Data;
    },
    select: (data) => {
      const result = data.map((item) => ({
        "회사 코드": item.F01,
        "회사 명": item.F02,
        "회사 유형": convertText(CORP_GRP_ITEM, item.F03),
        "상위 회사 코드": item.F04,
        생성자: item.F05,
        "생성 일시": convertToStandardDateTime(item.F06),
      }));
      return result;
    },
    enabled: corpStore.nonce > 0,
  });

  const rowData = corpStore.nonce === 0 ? [] : data;

  return (
    <div className={classNames("ag-theme-alpine", tableWrap)}>
      <AgGridReact
        columnDefs={colDefs}
        rowData={rowData}
        overlayNoRowsTemplate={"<span>데이터가 없습니다.</span>"}
        headerHeight={28}
        rowHeight={28}
      />
    </div>
  );
}
