import { callTms, StringRspnData } from "@/libraries/call-tms";
import { Promised } from "@/types/common";
import { useMutation, useQuery } from "@tanstack/react-query";

/** 직종 코드 조회 */
export type TTCW000100SMQ02Data = Promised<typeof getTCW000100SMQ02>;
export const getTCW000100SMQ02 = async (args: { session: Session | null }) => {
  const response = await callTms<StringRspnData<5>>({
    svcId: "TCW000100SMQ02",
    session: args.session,
    locale: "ko",
    data: [""],
    pgSize: 0, // 전부 다 조회
    zipYn: true,
  });

  const data = response.svcRspnData || [];

  if (!data) {
    throw new Error("FW999");
  }

  const convertedData = data.map((d) => ({
    instCd: d.F01,
    instNm: d.F02,
    mrkrCd: d.F03,
    instTp: d.F04,
    mastInstCd: d.F05,
  }));

  return convertedData;
};

export const useTCW000100SMQ02 = (args: { session: Session | null }) =>
  useQuery({
    queryKey: ["TCW000100SMQ02", args?.session],
    queryFn: () => getTCW000100SMQ02(args),
  });

/** 국가 코드 조회 */
export type TTCW000100SMQ03Data = Promised<typeof getTCW000100SMQ03>;
export const getTCW000100SMQ03 = async (args: { session: Session | null }) => {
  const response = await callTms<StringRspnData<5>>({
    svcId: "TCW000100SMQ03",
    session: args.session,
    locale: "ko",
    data: [""],
    pgSize: 0, // 전부 다 조회
  });

  const data = response.svcRspnData || [];

  if (!data) {
    throw new Error("FW999");
  }

  const convertedData = data.map((d) => ({
    cntryCd: d.F01,
    cntryEnNm: d.F02,
    cntryKoNm: d.F03,
  }));

  return convertedData;
};

/** 국가코드 조회 */
export const useTCW000100SMQ03 = (args: { session: Session | null }) =>
  useQuery({
    queryKey: ["TCW000100SMQ03", args?.session],
    queryFn: () => getTCW000100SMQ03(args),
  });
