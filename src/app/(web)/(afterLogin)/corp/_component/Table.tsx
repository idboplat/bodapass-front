"use client";

import { AgGridReact } from "ag-grid-react";
import { GRID_COLS } from "../_const/colum";
import { useState } from "react";
import { tableWrap } from "./Table.css";

export default function Table() {
  const [colDefs] = useState<any>([...GRID_COLS]);

  return (
    <div className={tableWrap}>
      <AgGridReact
        columnDefs={colDefs}
        rowData={[]}
        overlayNoRowsTemplate={"<span>데이터가 없습니다.</span>"}
      />
    </div>
  );
}
