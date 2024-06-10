"use client";

import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { GRID_COLS } from "../_const/colum";
import { tableWrap } from "./table.css";

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
