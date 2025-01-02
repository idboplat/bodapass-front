import { gridOptions } from "@/utils/agGridUtils";
import { AgGridReact } from "ag-grid-react";
import classNames from "classnames";

interface AgGridProps {
  data?: any[];
  colDefs: any[];
  className?: string;
  height?: number;
  isShowNoRowsOverlay?: boolean;
  headeHeight?: number;
  rowHeight?: number;
}

export default function CustomAgGrid({
  className,
  data,
  colDefs,
  headeHeight = 38,
  rowHeight = 38,
  height = 760,
  isShowNoRowsOverlay = true,
}: AgGridProps) {
  return (
    <div className={classNames("top-grid", "ag-theme-alpine", className)} style={{ height }}>
      <AgGridReact
        rowData={data}
        columnDefs={colDefs}
        defaultColDef={gridOptions}
        headerHeight={headeHeight}
        rowHeight={rowHeight}
        overlayNoRowsTemplate={
          isShowNoRowsOverlay
            ? '<span style="padding-top: 26px; ">데이터가 없습니다.</span>'
            : "<span></span>"
        }
        suppressDragLeaveHidesColumns={true}
      />
    </div>
  );
}
