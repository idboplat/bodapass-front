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

/** 0: 공무담당자, 1: 반장, 2: 팀원, 3: 일용직 */
export type TWrkTp = "0" | "1" | "2" | "3";
/** 2: 소셜, 3: 전화번호, 4: 아이디, 5: etc */
export type TLoginTp = "2" | "3" | "4" | "5";

export type TIdTp = "1" | "2" | "3" | "4" | "5-1" | "5-2" | "5-3";

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

  /** 대면 근로자 인증 종료 */
  crewAuthorizationEnd: "crewAuthorizationEnd",
  leaderAuthorizationEnd: "leaderAuthorizationEnd",

  leaderContractEnd: "leaderContractEnd",
  crewContractEnd: "crewContractEnd",
  crewContractUpdateEnd: "crewContractUpdateEnd",
  crewContractCancelEnd: "crewContractCancelEnd",

  /** payload: { lat: number; lng: number } */
  navigateMapScreen: "navigateMapScreen",

  /** agreement */
  thirdPartyPrivacyAgreementEnd: "thirdPartyPrivacyAgreementEnd",

  /** 사용자 정보 수정 종료 */
  userInfoEditEnd: "userInfoEditEnd",

  /** 회원탈퇴 종료 */
  deleteAccountEnd: "deleteAccountEnd",

  // map
  /** payload: {} */
  loadDeviceLocation: "loadDeviceLocation",
  requestDeviceLocation: "requestDeviceLocation",
  responseDeviceLocation: "responseDeviceLocation",
};
