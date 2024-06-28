import { Page } from "@web/(afterLogin)/_lib/getPage";
import { ColDef } from "ag-grid-community";
import { Session } from "next-auth";

export type HomeProps<T> = {
  page: Page;
  session: Session;
};

export type Meta = {
  cols: ColDef[];
  svcId: string;
};

export const CORP_GRP = ["G1", "G2", "G3", "G4"] as const;
export type CORP_GRP_TP = (typeof CORP_GRP)[number];
