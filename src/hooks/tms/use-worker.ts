import { callTms, StringRspnData } from "@/libraries/call-tms";
import { Promised } from "@/types/common";
import { useMutation, useQuery } from "@tanstack/react-query";

export type TTCM200801SSQ01Data = Promised<typeof getTCM200801SSQ01>;
export const getTCM200801SSQ01 = async ({ session }: { session: Session; userId: string }) => {
  const response = await callTms<StringRspnData<20>>({
    svcId: "TCM200801SSQ01",
    session,
    locale: "ko",
    data: [session.userId],
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
    idCetYn: data.F13,
    /** 1: 주민번호, 2: 운전면허증, 3: 외국인등록증, 4: 여권 */
    idTp: data.F14,
    faceRgstYn: data.F15,
    acctCetYn: data.F16,
    bankCd: data.F17,
    bankNm: data.F18,
    bankAcctNo: data.F19,
    privacyYn: data.F20,
  };
};

export const useTCM200801SSQ01 = (args: { session: Session; userId: string }) =>
  useQuery({
    queryKey: ["TCM200801SSQ01", args.session, args.userId],
    queryFn: () => getTCM200801SSQ01(args),
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
