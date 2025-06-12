import { gridOptions } from "@/utils/agGridUtils";
import { ColDef, ColGroupDef, RowClickedEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { clsx } from "clsx";

interface AgGridProps<T> {
  data?: any[];
  colDefs: (ColDef | ColGroupDef)[];
  className?: string;
  height?: number;
  isShowNoRowsOverlay?: boolean;
  headeHeight?: number;
  rowHeight?: number;
  onRowClicked?: (event: RowClickedEvent<Record<string, string>>) => void;
  context?: T;
}

export default function CustomAgGrid<T>({
  className,
  data,
  colDefs,
  headeHeight = 38,
  rowHeight = 38,
  height = 800,
  isShowNoRowsOverlay = true,
  onRowClicked,
  context,
}: AgGridProps<T>) {
  return (
    <div className={clsx("top-grid", "ag-theme-alpine", className)} style={{ height }}>
      <AgGridReact
        context={context}
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
        onRowClicked={onRowClicked}
      />
    </div>
  );
}
