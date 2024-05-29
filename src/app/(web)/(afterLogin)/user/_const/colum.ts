import { ColDef } from "ag-grid-community";
import ConnectionStatus from "../_component/ConnectionStatus";

export const GRID_COLS: ColDef[] = [
  {
    field: "접속 여부",
    width: 70,
    resizable: true,
    cellRenderer: ConnectionStatus,
  },
  {
    field: "사용자 ID",
    width: 160,
    resizable: true,
    editable: true,
  },
  {
    field: "비밀번호",
    width: 160,
    resizable: true,
    editable: true,
  },
  {
    field: "사용자 명",
    width: 160,
    resizable: true,
    editable: true,
  },
  {
    field: "이메일",
    width: 160,
    resizable: true,
    editable: true,
  },
  {
    field: "전화번호",
    width: 120,
    resizable: true,
    editable: true,
    cellStyle: { justifyContent: "flex-start", paddingLeft: "7px" },
  },
  {
    field: "사용자 레벨",
    width: 80,
    resizable: true,
    editable: true,
  },
  {
    field: "가입일시",
    width: 180,
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
    field: "메모",
    width: 180,
    resizable: true,
    editable: true,
  },
];
