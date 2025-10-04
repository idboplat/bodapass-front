import { callTms, StringRspnData } from "@/libraries/call-tms";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Promised } from "@/types/common";

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
