import { callTms, callWas, FillerRspnData, StringRspnData } from "@/libraries/call-tms";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Promised } from "@/types/common";
import { useRouter } from "next/router";

const TCM200201SMQ01_PAGE_SIZE = 10;
const getTCM200201SMQ01 = async (args: {
  session: Session;
  cntrStatTp: string;
  mastCorpCd: string;
  corpCd: string;
  pageNm: number;
}) => {
  const response = await callTms<StringRspnData<12>>({
    svcId: "TCM200201SMQ01",
    session: args.session,
    data: [args.session.userId, args.cntrStatTp, args.mastCorpCd, args.corpCd],
    locale: "ko",
    pgSize: TCM200201SMQ01_PAGE_SIZE,
    pgSn: args.pageNm,
  });

  const isNextPage = response.svcNextPageSn !== 0;
  const data = response.svcRspnData || [];

  const convertedData = data.map((d) => ({
    mastCorpCd: d.F01,
    corpCd: d.F02,
    corpNm: d.F03,
    siteNm: d.F04,
    userId: d.F05,
    instCd: d.F06,
    ordrPrc: d.F07,
    wrkStrDd: d.F08,
    wrkEndDd: d.F09,
    cntrStatTp: d.F10,
    insYn: d.F11,
    creWrkId: d.F12,
  }));

  return {
    rows: convertedData,
    nextPageNm: isNextPage ? args.pageNm + 1 : null,
  };
};

export type TTCM200201SMQ01Data = Promised<typeof getTCM200201SMQ01>;
export type TTCM200201SMQ01RowData = TTCM200201SMQ01Data["rows"][number];

/** 계약 목록 조회 */
export const useTCM200201SMQ01 = (args: {
  session: Session;
  mastCorpCd: string;
  corpCd: string;
  pageNm: number;
  cntrStatTp: string;
}) =>
  useQuery({
    queryKey: [
      "TCM200201SMQ01",
      args.session,
      args.cntrStatTp,
      args.mastCorpCd,
      args.corpCd,
      args.pageNm,
    ],
    queryFn: () => getTCM200201SMQ01(args),
  });

/** 가/부 처리 */
export const useTCM200201SSP01 = () =>
  useMutation({
    mutationFn: async (args: {
      mastCorpCd: string;
      corpCd: string;
      userId: string;
      type: "REJ" | "APL";
      session: Session;
      cntrDd: string;
      cntrSn: string;
    }) => {
      const request = await callTms<StringRspnData<1>>({
        svcId: "TCM200201SSP01",
        data: [args.mastCorpCd, args.corpCd, args.userId, args.type, args.cntrDd, args.cntrSn],
        session: args.session,
        locale: "ko",
      });

      const data = request.svcRspnData?.[0];
      if (!data) throw new Error("FW999");

      return data;
    },
  });

export const useTCM200200SSP02 = () =>
  useMutation({
    mutationFn: async (args: {
      mastCorpCd: string;
      corpCd: string;
      userId: string;
      session: Session;
      instCd: string;
      ordrPrc: string;
      wrkStrDd: string;
      wrkEndDd: string;
      insYn: string;
      subMngrYn: string;
    }) => {
      const request = await callTms<StringRspnData<1>>({
        svcId: "TCM200200SSP02",
        data: [
          args.corpCd,
          args.mastCorpCd,
          args.userId,
          args.instCd,
          args.ordrPrc,
          args.wrkStrDd.replaceAll("-", ""),
          args.wrkEndDd.replaceAll("-", ""),
          args.insYn,
          args.subMngrYn,
        ],
        session: args.session,
        locale: "ko",
      });

      const data = request.svcRspnData?.[0];
      if (!data) throw new Error("FW999");

      return data;
    },
  });

/** 계약 내용 상세 조회 */
const getWCM200201SSQ01 = async (args: {
  session: Session;
  mastCorpCd: string;
  corpCd: string;
  userId: string;
  cntrDd: string;
  cntrSn: string;
}) => {
  const response = await callWas<StringRspnData<24>>({
    apiPathName: "WCM200201SSQ01",
    svcId: "TCM200201SSQ01",
    session: args.session,
    locale: "ko",
    data: [args.mastCorpCd, args.corpCd, args.userId, args.cntrDd, args.cntrSn],
    formData: [],
  });

  const data = response.svcRspnData?.[0];

  if (!data) return null;

  return {
    mastCorpCd: data.F01,
    corpCd: data.F02,
    corpNm: data.F03,
    telNo: data.F04, // 회사 전화번호
    siteNm: data.F05,
    siteTelNo: data.F06,
    siteAddr: data.F07,
    siteAddrDtil: data.F08,
    siteCoorX: data.F09,
    siteCoorY: data.F10,
    userId: data.F11,
    userNm: data.F12,
    instCd: data.F13,
    ordrPrc: data.F14,
    wrkStrDd: data.F15,
    wrkEndDd: data.F16,
    cntrStatTp: data.F17,
    insYn: data.F18,
    userTelNo: data.F19, // 팀원 전화번호
    subMngrYn: data.F20,
    cntrDd: data.F21,
    cntrSn: data.F22,
    faceRgstYn: data.F23,
    faceImgFile: data.F24,
  };
};

export type TWCM200201SSQ01Data = Promised<typeof getWCM200201SSQ01>;

export const useWCM200201SSQ01 = (args: {
  session: Session;
  mastCorpCd: string;
  corpCd: string;
  userId: string;
  cntrDd: string;
  cntrSn: string;
}) =>
  useQuery({
    queryKey: [
      "WCM200201SSQ01",
      args.session,
      args.mastCorpCd,
      args.corpCd,
      args.userId,
      args.cntrDd,
      args.cntrSn,
    ],
    queryFn: () => getWCM200201SSQ01(args),
  });

/**  팀원 계약 기초 자료 조회 */
const getTCM200202SSQ01 = async (args: {
  session: Session;
  mastCorpCd: string;
  corpCd: string;
  userId: string;
}) => {
  const response = await callTms<StringRspnData<17>>({
    svcId: "TCM200202SSQ01",
    session: args.session,
    locale: "ko",
    data: [args.mastCorpCd, args.corpCd, args.userId],
  });

  const data = response.svcRspnData?.[0];

  if (!data) return null;

  return {
    mastCorpCd: data.F01,
    corpCd: data.F02,
    corpNm: data.F03,
    telNo: data.F04,
    siteNm: data.F05,
    siteTelNo: data.F06,
    siteAddr: data.F07,
    siteAddrDtil: data.F08,
    siteCoorX: data.F09,
    siteCoorY: data.F10,
    userId: data.F11,
    userNm: data.F12,
    instCd: data.F13,
    ordrPrc: data.F14,
    wrkStrDd: data.F15,
    wrkEndDd: data.F16,
    insYn: data.F17,
  };
};

export type TTCM200202SSQ01Data = Promised<typeof getTCM200202SSQ01>;

export const useTCM200202SSQ01 = (args: {
  session: Session;
  mastCorpCd: string;
  corpCd: string;
  userId: string;
}) =>
  useQuery({
    queryKey: ["TCM200202SSQ01", args.session, args.mastCorpCd, args.corpCd],
    queryFn: () => getTCM200202SSQ01(args),
  });

export const useTCM200201SSP02 = () =>
  useMutation({
    mutationFn: async (args: {
      session: Session;
      mastCorpCd: string;
      corpCd: string;
      userId: string;
      instCd: string;
      ordrPrc: string;
      wrkStrDd: string;
      wrkEndDd: string;
      cntrStatTp: string;
      insYn: string;
      subMngrYn: string;
      cntrDd: string;
      cntrSn: string;
      userDcsr: string;
    }) => {
      const response = await callTms<StringRspnData<1>>({
        svcId: "TCM200201SSP02",
        session: args.session,
        locale: "ko",
        data: [
          args.mastCorpCd,
          args.corpCd,
          args.userId,
          args.instCd,
          args.ordrPrc,
          args.wrkStrDd.replaceAll("-", ""),
          args.wrkEndDd.replaceAll("-", ""),
          args.cntrStatTp,
          args.insYn,
          args.subMngrYn,
          args.cntrDd,
          args.cntrSn,
          args.userDcsr || "",
        ],
      });

      const data = response.svcRspnData?.[0];
      if (!data) throw new Error("FW999");

      return data;
    },
  });

/** 팀원 계약 해지(반장) */
export const useTCM200201SSP03 = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (args: {
      session: Session;
      mastCorpCd: string;
      corpCd: string;
      userId: string;
      cntrDd: string;
      cntrSn: string;
    }) => {
      const request = await callTms<FillerRspnData>({
        svcId: "TCM200201SSP03",
        data: [
          args.mastCorpCd, // 회사코드
          args.corpCd, // 현장코드
          args.userId, // 팀원 사용자 ID
          args.cntrDd, // 계약일자
          args.cntrSn, // 계약번호
        ],
        session: args.session,
        locale: "ko",
      });

      const data = request.svcRspnData?.[0];
      if (!data) throw new Error("FW999");

      return data;
    },
  });
};
