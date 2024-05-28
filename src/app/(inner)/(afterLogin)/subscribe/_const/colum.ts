import { ColDef } from "ag-grid-community";

export const SUBSCRIBE_RECEPTION_GRID_COLS: ColDef[] = [
  {
    field: "사용자ID",
    width: 150,
    resizable: true,
    editable: true,
  },
  {
    field: "사용자명",
    width: 120,
    resizable: true,
    editable: true,
  },
  {
    field: "구독번호",
    width: 150,
    resizable: true,
    editable: true,
  },
  {
    field: "구독시작일",
    width: 120,
    resizable: true,
    editable: true,
  },
  {
    field: "구독만료일",
    width: 120,
    resizable: true,
    editable: true,
  },
  {
    field: "사용자레벨",
    width: 100,
    resizable: true,
    editable: true,
  },
];

export const SUBSCRIBE_CHART_TYPE_GRID_COLS: ColDef[] = [
  {
    field: "사용자ID",
    width: 150,
    resizable: true,
    editable: true,
  },
  {
    field: "구독번호",
    width: 150,
    resizable: true,
    editable: true,
  },
  {
    field: "차트명",
    width: 250,
    resizable: true,
    editable: true,
  },
];
