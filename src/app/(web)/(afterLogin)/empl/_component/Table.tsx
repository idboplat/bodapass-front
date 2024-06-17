"use client";

import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { GRID_COLS } from "../_const/colum";
import { tableWrap } from "./table.css";
import classNames from "classnames";
import PagePagination from "@/app/_component/pagination/PagePagination";

export default function Table() {
  const [colDefs] = useState([...GRID_COLS]);
  const [dataId, setDataId] = useState(11);

  const onClick = (page: number) => {
    setDataId(page);
  };

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
