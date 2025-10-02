import { callTms, StringRspnData } from "@/libraries/call-tms";
import { useQuery } from "@tanstack/react-query";
import { Promised } from "@/types/common";

const getTCM200201SMQ01 = async (args: { session: Session; cntrYn: string }) => {
  const response = await callTms<StringRspnData<12>>({
    svcId: "TCM200201SMQ01",
    session: args.session,
    data: [args.session.userId, args.cntrYn],
    locale: "ko",
    csvDown: true, // 일단 다 가져온다.
  });

  const data = response.svcRspnData || [];

  return data.map((d) => ({
    mastCorpCd: d.F01,
    corpCd: d.F02,
    corpNm: d.F03,
    siteNm: d.F04,
    userId: d.F05,
    instCd: d.F06,
    ordrPrc: d.F07,
    wrkStrDd: d.F08,
    wrkEndDd: d.F09,
    cntrYn: d.F10,
    insYn: d.F11,
    creWrkId: d.F12,
  }));
};

export type TTCM200201SMQ01Data = Promised<typeof getTCM200201SMQ01>;
export type TTCM200201SMQ01RowData = TTCM200201SMQ01Data[number];

export const useTCM200201SMQ01 = (args: { session: Session; cntrYn: string }) =>
  useQuery({
    queryKey: ["TCM200201SMQ01", args.session, args.cntrYn],
    queryFn: () => getTCM200201SMQ01(args),
  });
