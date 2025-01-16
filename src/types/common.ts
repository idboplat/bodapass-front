import { TClientPage } from "@/utils/getPage";
import { PickerBaseProps } from "@mantine/dates";

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
  collectionId: string;
};
