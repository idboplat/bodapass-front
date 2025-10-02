import { callTms, StringRspnData } from "@/libraries/call-tms";

/** 현장 정보 조회 */
const getTCM200100SMQ01 = async ({ session }: { session: Session }) => {
  const result = await callTms<StringRspnData<4>>({
    svcId: "TCM200100SMQ01",
    session,
    locale: "ko",
    data: [session.userId],
  });

  const data = result.svcRspnData || [];

  return data.map((d) => ({
    mastCorpCd: d.F01,
    mastCorpNm: d.F02,
    corpCd: d.F03,
    siteNm: d.F04,
  }));
};
