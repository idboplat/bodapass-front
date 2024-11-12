import { Page } from "@/utils/getPage";
import { Session } from "next-auth";
import dayjs from "@/libraries/dayjs";

export type HomeProps<T> = {
  page: Page;
  session: Session;
};

export const CORP_GRP = ["G1", "G2", "G3", "G4"] as const;
export type CORP_GRP_TP = (typeof CORP_GRP)[number];
