"use client";

import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { GRID_COLS, RowData } from "../_const/colum";
import { tableWrap } from "./table.css";
import classNames from "classnames";
import { ICellRendererParams } from "ag-grid-community";
import ReqStatus from "./ReqStatus";
import { useQuery } from "@tanstack/react-query";
import callTms from "@/model/callTms";
import { TBW_000300_Q01 } from "@/type/api";
import { Session } from "next-auth";

export default function Table({ session }: { session: Session }) {
  const [colDefs] = useState(() => {
    const cols = [...GRID_COLS];
    cols[3].cellRenderer = ({ node }: ICellRendererParams<RowData, undefined, undefined>) => {
      const { data, rowIndex } = node;
      const isRender = data && rowIndex !== null;
      return isRender ? <ReqStatus index={rowIndex} data={data} /> : null;
    };
    return cols;
  });

  const { data } = useQuery({
    queryKey: ["TBW_000300_Q01"],
    queryFn: async () => {
      const TBW_000300_Q01Res = await callTms<TBW_000300_Q01>({
        session,
        svcId: "TBW_000300_Q01",
        data: [""], // 입출고 구분
        pgSize: 20,
      });
      const TBW_000300_Q01Data = TBW_000300_Q01Res.svcRspnData || [];
      return TBW_000300_Q01Data;
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

  console.log("TBW_000300_Q01Data", data);

  const dummy = [
    {
      회사코드: "24500002",
      회사명: "24년도 회사2",
      구매요청수량: "10000000",
      요청상태: "REQ",
      요청일시: "2021-10-01 10:00:00",
      처리일시: "2024.05.28 22:22:22",
      요청사원ID: "245000020000000",
      처리사원ID: "239000010000000",
    },
    {
      회사코드: "24500001",
      회사명: "24년도 회사1",
      구매요청수량: "400000000",
      요청상태: "CAN",
      요청일시: "2021-10-01 10:00:00",
      처리일시: "2024.05.28 22:22:22",
      요청사원ID: "245000020000000",
      처리사원ID: "239000010000000",
    },
    {
      회사코드: "23B00001",
      회사명: "23년도 회사4",
      구매요청수량: "500000000",
      요청상태: "REJ",
      요청일시: "2021-10-01 10:00:00",
      처리일시: "2024.05.28 22:22:22",
      요청사원ID: "245000020000000",
      처리사원ID: "239000010000000",
    },
    {
      회사코드: "23A00001",
      회사명: "23년도 회사3",
      구매요청수량: "600000000",
      요청상태: "APL",
      요청일시: "2021-10-01 10:00:00",
      처리일시: "2024.05.28 22:22:22",
      요청사원ID: "245000020000000",
      처리사원ID: "239000010000000",
    },
  ];

  return (
    <div className={classNames("ag-theme-alpine", tableWrap)}>
      <AgGridReact
        columnDefs={colDefs}
        rowData={dummy}
        overlayNoRowsTemplate={"<span>데이터가 없습니다.</span>"}
        headerHeight={28}
        rowHeight={28}
      />
    </div>
  );
}
