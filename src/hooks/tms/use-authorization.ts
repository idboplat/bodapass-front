import { callTms, callWas, StringRspnData } from "@/libraries/call-tms";
import { useMutation } from "@tanstack/react-query";

/**
 * 공통 신분증 조회
 *
 * 반장의 경우 brkrId 공백 처리
 */
export const useWCW000002SSQ01 = () =>
  useMutation({
    mutationFn: async (args: {
      image: Blob;
      brkrId: string;
      tp: "1" | "2" | "3";
      session: Session;
    }) => {
      const result = await callWas<StringRspnData<3>>({
        svcId: "WCW000002SSQ01", // 매칭되는 svcId 없음
        apiPathName: "WCW000002SSQ01",
        locale: "ko",
        session: args.session,
        data: [args.brkrId, args.tp],
        formData: [args.image],
      });

      const data = result.svcRspnData?.[0];

      if (!data) throw new Error("FW999");

      return {
        name: data.F01,
        id1: data.F02,
        id2: data.F03,
        image: args.image,
        type: args.tp,
      };
    },
  });

/** 반장 신분증 등록 */
export const useWCW000001SSP02 = () =>
  useMutation({
    mutationFn: async (args: {
      id1: string;
      id2: string;
      name: string;
      addr: string;
      addrDtil: string;
      tel: string;
      image: Blob;
      type: "1" | "2" | "3";
      zipCd: string;
      session: Session;
    }) => {
      const res = await callWas<StringRspnData<1>>({
        apiPathName: "WCW000001SSP02",
        svcId: "TCW000001SSP02",
        session: args.session,
        locale: "ko",
        data: [
          args.session.userId,
          "jpeg",
          args.name,
          args.id1 + args.id2,
          args.type,
          args.addr,
          args.addrDtil,
          args.tel.replaceAll("-", ""),
          args.zipCd,
          "",
        ],
        formData: [args.image],
      });

      const data = res.svcRspnData?.[0];

      if (!data) throw new Error("FW999");

      return data;
    },
  });

/** 근로자 신분증 등록 */
export const useWCW000002SSP02 = () =>
  useMutation({
    mutationFn: async (args: {
      id1: string;
      id2: string;
      name: string;
      addr: string;
      addrDtil: string;
      tel: string;
      zipCd: string;
      image: Blob;
      type: "1" | "2" | "3";
      brkrId: string;
      session: Session;
    }) => {
      const res = await callWas<StringRspnData<1>>({
        apiPathName: "WCW000002SSP02",
        svcId: "TCW000002SSP02",
        session: args.session,
        locale: "ko",
        data: [
          args.brkrId,
          "jpeg",
          args.name,
          args.id1 + args.id2,
          args.type,
          args.addr,
          args.addrDtil,
          args.tel.replaceAll("-", ""),
          args.zipCd,
        ],
        formData: [args.image],
      });

      const data = res.svcRspnData?.[0];

      if (!data) throw new Error("FW999");

      return data;
    },
  });

/** 반장 얼굴 등록 */
export const useWCW000001SSP01 = () =>
  useMutation({
    mutationFn: async (args: { image: Blob; userId: string; session: Session }) => {
      const result = await callWas<StringRspnData<1>>({
        apiPathName: "WCW000001SSP01",
        svcId: "TCW000001SSP01",
        data: [args.userId, "jpeg", ""],
        locale: "ko",
        session: args.session,
        formData: [args.image],
      });

      const data = result.svcRspnData?.[0];

      if (!data) throw new Error("FCM999");

      return { faceId: data.F01, userId: args.userId };
    },
  });

/** 근로자 얼굴 등록 */
export const useWCW000002SSP01 = () =>
  useMutation({
    mutationFn: async (args: { image: Blob; userId: string; session: Session }) => {
      const result = await callWas<StringRspnData<1>>({
        apiPathName: "WCW000002SSP01",
        svcId: "TCW000002SSP01",
        data: [args.userId, "jpeg", ""],
        locale: "ko",
        session: args.session,
        formData: [args.image],
      });

      const data = result.svcRspnData?.[0];

      if (!data) throw new Error("FCM999");

      return { faceId: data.F01, userId: args.userId };
    },
  });

/** 반장 통장 등록 */
export const useWCW000001SSP03 = () =>
  useMutation({
    mutationFn: async (args: {
      userId: string;
      bankCd: string;
      bankNm: string;
      bankAccountNo: string;
      bankImage: Blob;
      session: Session;
    }) => {
      const result = await callWas<StringRspnData<1>>({
        apiPathName: "WCW000001SSP03",
        svcId: "TCW000001SSP03",
        locale: "ko",
        session: args.session,
        data: [args.userId, "jpeg", args.bankCd, args.bankNm, args.bankAccountNo, ""],
        formData: [args.bankImage],
      });

      const data = result.svcRspnData?.[0];

      if (!data) throw new Error("FW999");

      return { bankImageSrc: data.F01 };
    },
  });

/** 근로자 통장 등록 */
export const useWCW000002SSP03 = () =>
  useMutation({
    mutationFn: async (args: {
      userId: string;
      bankCd: string;
      bankNm: string;
      bankAccountNo: string;
      bankImage: Blob;
      session: Session;
    }) => {
      const result = await callWas<StringRspnData<1>>({
        apiPathName: "WCW000002SSP03",
        svcId: "TCW000002SSP03",
        locale: "ko",
        session: args.session,
        data: [args.userId, "jpeg", args.bankCd, args.bankNm, args.bankAccountNo, ""],
        formData: [args.bankImage],
      });

      const data = result.svcRspnData?.[0];

      if (!data) throw new Error("FW999");

      return { bankImageSrc: data.F01 };
    },
  });

export const useTCW000001SSP04 = () =>
  useMutation({
    mutationFn: async (args: { session: Session; userId: string }) => {
      const response = await callTms<StringRspnData<1>>({
        svcId: "TCW000001SSP04",
        data: [args.userId],
        locale: "ko",
        session: args.session,
      });

      const data = response.svcRspnData?.[0];

      if (!data) throw new Error("FW999");

      return data;
    },
  });
