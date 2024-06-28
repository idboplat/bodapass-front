import { ICellRendererParams } from "ag-grid-community";
import { RowData } from "../_const/row";
import ReqStatus from "../_component/ReqStatus";

export const reqStatusRenderer = ({ node }: ICellRendererParams<RowData, undefined, undefined>) => {
  const { data, rowIndex } = node;
  const isRender = data && rowIndex !== null;
  return isRender ? <ReqStatus index={rowIndex} data={data} /> : null;
};
