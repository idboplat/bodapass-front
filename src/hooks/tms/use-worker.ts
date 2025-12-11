import { callTms, callWas, StringRspnData } from "@/libraries/call-tms";
import { Promised } from "@/types/common";
import { useMutation, useQuery } from "@tanstack/react-query";
import { nativeAlert } from "../use-device-api";
import { TmsError } from "@/libraries/error";

/**  [사용자] 사용자 기본 정보 조회 */
export type TWCM200801SSQ01Data = Promised<typeof getWCM200801SSQ01>;
export const getWCM200801SSQ01 = async ({
  session,
  userId,
  extnUserId,
  loginTp,
}: {
  session: Session;
  userId: string;
  extnUserId: string;
  loginTp: string;
}) => {
  const response = await callWas<StringRspnData<15>>({
    apiPathName: "WCM200801SSQ01",
    svcId: "TCM200801SSQ01",
    session,
    locale: "ko",
    data: [userId, extnUserId, loginTp],
    formData: [],
  });

  const data = response.svcRspnData?.[0];

  if (!data) {
    throw new Error("FW999");
  }

  return {
    userId: data.F01,
    externalId: data.F02,
    telNo: data.F03,
    userNm: data.F04,
    idNo: data.F05,
    loginTp: data.F06,
    addr: data.F07,
    addrDtil: data.F08,
    zipCd: data.F09,
    cntryCd: data.F10,
    wrkTp: data.F11,
    brkrId: data.F12,
    faceRgstYn: data.F13,
    faceImgFile: data.F14,
    emailAddr: data.F15,
  };
};

export const useWCM200801SSQ01 = (args: {
  session: Session;
  userId: string;
  extnUserId: string;
  loginTp: string;
}) =>
  useQuery({
    queryKey: ["WCM200801SSQ01", args],
    queryFn: () => getWCM200801SSQ01(args),
  });

export const useTCM200200SSP01 = () =>
  useMutation({
    mutationFn: async (args: {
      session: Session;
      userId: string;
      price: string;
      instCd: string;
    }) => {
      const response = await callTms<StringRspnData<1>>({
        svcId: "TCM200200SSP01",
        session: args.session,
        locale: "ko",
        data: [args.session.userId, args.userId, args.price, args.instCd],
      });

      const data = response.svcRspnData?.[0];

      if (!data) throw new Error("FW999");

      return data;
    },
  });

/**  [사용자] 사용자 인증 정보 조회 */
export type TTCM200801SSQ02Data = Promised<typeof getTCM200801SSQ02>;
export const getTCM200801SSQ02 = async (args: { session: Session; userId: string }) => {
  const response = await callTms<StringRspnData<9>>({
    svcId: "TCM200801SSQ02",
    session: args.session,
    locale: "ko",
    data: [args.userId],
  });

  const data = response.svcRspnData?.[0];

  if (!data) throw new Error("FW999");

  return {
    idCetYn: data.F01,
    /** 1: 주민번호, 2: 운전면허증, 3: 외국인등록증, 4: 여권 */
    idTp: data.F02,
    faceRgstYn: data.F03,
    acctCetYn: data.F04,
    bankCd: data.F05,
    bankNm: data.F06,
    bankAcctNo: data.F07,
    privacyYn: data.F08,
    faceImgFile: data.F09,
  };
};

export const useTCM200801SSQ02 = (args: { session: Session; userId: string }) =>
  useQuery({
    queryKey: ["TCM200801SSQ02", args.session, args.userId],
    queryFn: () => getTCM200801SSQ02(args),
  });

/** 사용자 기본 정보 갱신 */
export const useTCM200801SSP01 = () =>
  useMutation({
    mutationFn: async (args: {
      session: Session;
      telNo: string;
      userNm: string;
      IdNo: string;
      loginTp: string;
      addr: string;
      addrDtil: string;
      zipCd: string;
      cntryCd: string;
      wrkTp: string;
      emailAddr: string;
    }) => {
      const response = await callTms<StringRspnData<1>>({
        svcId: "TCM200801SSP01",
        session: args.session,
        locale: "ko",
        data: [
          args.session.userId,
          args.session.extnUserId,
          args.telNo,
          args.userNm,
          args.IdNo,
          args.loginTp,
          args.addr,
          args.addrDtil,
          args.zipCd,
          args.cntryCd,
          args.wrkTp,
          args.emailAddr,
        ],
      });

      const data = response.svcRspnData?.[0];

      if (!data) throw new Error("FW999");

      return data;
    },
  });

/** 회원탈퇴 */
export const useTCM200801SSP02 = () =>
  useMutation({
    mutationFn: async (args: { session: Session; password: string }) => {
      const response = await callTms<StringRspnData<1>>({
        svcId: "TCM200801SSP02",
        session: args.session,
        locale: "ko",
        data: [args.session.userId, args.password],
      });

      const data = response.svcRspnData?.[0];

      if (!data) throw new Error("FW999");

      return data;
    },
    onError: (error: unknown) => {
      if (error instanceof TmsError) {
        nativeAlert(error.message);
      } else {
        nativeAlert("회원탈퇴에 실패했습니다.");
      }
    },
  });
