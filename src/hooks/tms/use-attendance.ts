import { callWas, StringRspnData } from "@/libraries/call-tms";
import { useMutation } from "@tanstack/react-query";

/** 1 대 1 비교 출퇴근 */
export const useTCM200101SSP01 = () =>
  useMutation({
    mutationFn: async (args: {
      mastCorpCd: string;
      corpCd: string;
      userId: string;
      attCd: "I" | "O" | "A";
      faceImgFile: string;
      session: Session;
      img: Blob;
    }) =>
      callWas<StringRspnData<1>>({
        apiPathName: "WCM200101SSP01",
        svcId: "TCM200101SSP01",
        session: args.session,
        locale: "ko",
        data: [args.mastCorpCd, args.corpCd, args.userId, args.attCd, args.faceImgFile],
        formData: [args.img],
      }),
  });

export const useTCM200201SSP01 = () =>
  useMutation({
    mutationFn: async (args: {
      mastCorpCd: string;
      corpCd: string;
      attCd: "I" | "O" | "A";
      session: Session;
      img: Blob;
    }) =>
      callWas<StringRspnData<1>>({
        apiPathName: "WCM200101SSP01",
        svcId: "TCM200101SSP01",
        session: args.session,
        locale: "ko",
        data: [args.mastCorpCd, args.corpCd, args.attCd],
        formData: [args.img],
      }),
  });
