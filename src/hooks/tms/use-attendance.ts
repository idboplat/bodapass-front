import { callWas, StringRspnData } from "@/libraries/call-tms";
import { useMutation } from "@tanstack/react-query";

/** 1 대 1 비교 출퇴근 */
export const useTCM200101SSP01 = () =>
  useMutation({
    mutationFn: async (args: {
      mastCorpCd: string;
      corpCd: string;
      /** 팀원 아이디 */
      userId: string;
      attCd: "I" | "O";
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

/** 1 대 다 출퇴근 */
export const useTCM200101SSP02 = () =>
  useMutation({
    mutationFn: async (args: {
      mastCorpCd: string;
      corpCd: string;
      attCd: "I" | "O";
      session: Session;
      img: Blob;
    }) =>
      callWas<StringRspnData<1>>({
        apiPathName: "WCM200101SSP02",
        svcId: "TCM200101SSP02",
        session: args.session,
        locale: "ko",
        data: [
          args.mastCorpCd,
          args.corpCd,
          "", // 검색된 팀원 아이디
          args.attCd,
          "", // 검색된 팀원 얼굴 이미지 파일
        ],
        formData: [args.img],
      }),
  });
