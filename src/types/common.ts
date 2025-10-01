import { PickerBaseProps } from "@mantine/dates";
import { NextPage } from "next";

export type Function<T> = (...arg: any) => T;
export type Promised<T extends Function<any>> = Awaited<ReturnType<T>>;
export type Filler = "";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export type TDatePickerValue = Date | null;
export type TRangePickerValue = [TDatePickerValue, TDatePickerValue];
export type TRangePickerChangeEventHandler = PickerBaseProps<"range">["onChange"];

export type TRegistInfo = {
  userName: string;
};

export type TCompareInfo = {
  collectionId: string;
};

export type ModalBaseProps = {
  onSuccess: (value: any) => void;
  onClose: () => void;
};

export type ModalProps<T = {}> = T & ModalBaseProps;
