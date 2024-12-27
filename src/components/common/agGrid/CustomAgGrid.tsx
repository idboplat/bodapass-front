import { gridOptions } from "@/utils/agGridUtils";
import { AgGridReact } from "ag-grid-react";

interface AgGridProps {
  data: any[];
  colDefs: any[];
}

export default function CustomAgGrid({ data, colDefs }: AgGridProps) {
  return (
    <div className="top-grid ag-theme-alpine">
      <AgGridReact
        rowData={data}
        columnDefs={colDefs}
        headerHeight={38}
        overlayNoRowsTemplate={'<span style="padding-top: 26px; ">데이터가 없습니다.</span>'}
        defaultColDef={gridOptions}
        suppressDragLeaveHidesColumns={true}
      />
    </div>
  );
}
