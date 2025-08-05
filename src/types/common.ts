import { TClientPage } from "@/utils/getPage";
import { PickerBaseProps } from "@mantine/dates";
import { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export type HomeProps<T = {}> = {
  page: TClientPage;
  session: Session;
  searchParams: Record<string, string>;
};

export const CORP_GRP = ["G1", "G2", "G3", "G4"] as const;
export type CORP_GRP_TP = (typeof CORP_GRP)[number];

export type TDatePickerValue = Date | null;
export type TRangePickerValue = [TDatePickerValue, TDatePickerValue];
export type TRangePickerChangeEventHandler = PickerBaseProps<"range">["onChange"];

export type TRegistInfo = {
  userName: string;
};

export type TCompareInfo = {
  collectionId: string;
};
