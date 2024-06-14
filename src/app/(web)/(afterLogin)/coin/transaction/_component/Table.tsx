"use client";

import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { GRID_COLS, RowData } from "../_const/colum";
import { tableWrap } from "./table.css";
import classNames from "classnames";
import { ICellRendererParams } from "ag-grid-community";
import ReqStatus from "./ReqStatus";

export default function Table() {
  const [colDefs] = useState(() => {
    const cols = [...GRID_COLS];
    cols[3].cellRenderer = ({ node }: ICellRendererParams<RowData, undefined, undefined>) => {
      const { data, rowIndex } = node;
      const isRender = data && rowIndex !== null;
      return isRender ? <ReqStatus index={rowIndex} data={data} /> : null;
    };
    return cols;
  });

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
