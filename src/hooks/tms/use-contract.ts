import { callTms, StringRspnData } from "@/libraries/call-tms";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Promised } from "@/types/common";

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
  cntrStatTp: string;
  mastCorpCd: string;
  corpCd: string;
  pageNm: number;
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
    }) => {
      const request = await callTms<StringRspnData<1>>({
        svcId: "TCM200201SSP01",
        data: [args.mastCorpCd, args.corpCd, args.userId, args.type],
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
        ],
        session: args.session,
        locale: "ko",
      });

      const data = request.svcRspnData?.[0];
      if (!data) throw new Error("FW999");

      return data;
    },
  });
