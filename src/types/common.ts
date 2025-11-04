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

export const DEVICE_API = {
  /** payload: string */
  nativeAlert: "nativeAlert",
  /** payload: string */
  nativeLogger: "nativeLogger",

  getDeviceSession: "getDeviceSession",
  /** payload: { session: Session } */
  updateDeviceSession: "updateDeviceSession",
  deleteDeviceSession: "deleteDeviceSession",

  /** payload: { userId: string } */
  addWorker: "addWorker",

  /** payload: { mastCorpCd: string, corpCd: string } */
  attendanceComplete: "attendanceComplete",

  /** 대면 근로자 인증 종료 */
  crewAuthorizationEnd: "crewAuthorizationEnd",
  leaderAuthorizationEnd: "leaderAuthorizationEnd",

  leaderContractEnd: "leaderContractEnd",
  crewContractEnd: "crewContractEnd",
  crewContractUpdateEnd: "crewContractUpdateEnd",

  /** payload: { lat: number; lng: number } */
  navigateMapScreen: "navigateMapScreen",

  /** agreement */
  thirdPartyPrivacyAgreementEnd: "thirdPartyPrivacyAgreementEnd",
};
