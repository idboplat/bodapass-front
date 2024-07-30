import { CellStyle } from "ag-grid-community";

export enum COLUMN_SIZE {
  /** 일련번호, 종목코드 */
  sm = 80,
  /**  회사 코드, 일자, 입출구분, 적요구분, 상태구분 */
  md = 100,
  /**  회사명, ID */
  lg = 120,
  /**  일시,  수량, 생성인, 관리자코드, 가격 */
  xl = 180,
  /**  체결번호 */
  "2xl" = 220,
}

type ColumnStyleType = "left" | "right";

export const COLUMN_STYLE: Record<ColumnStyleType, CellStyle> = {
  left: { justifyContent: "flex-start", paddingLeft: "7px" },
  right: { justifyContent: "flex-end", paddingRight: "7px" },
};
