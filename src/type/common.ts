import { Page } from "@web/(afterLogin)/_lib/getPage";
import { Session } from "next-auth";

export type HomeProps<T> = {
  page: Page;
  session: Session;
};

export const CORP_GRP = ["G1", "G2", "G3", "G4"] as const;
export type CORP_GRP_TP = (typeof CORP_GRP)[number];
