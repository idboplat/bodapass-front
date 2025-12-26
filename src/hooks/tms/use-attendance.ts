import { callTms, callWas, StringRspnData } from "@/libraries/call-tms";
import { useMutation, useQuery } from "@tanstack/react-query";

/** 1 대 1 비교 출퇴근 */
export const useWCM200101SSP01 = () =>
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

/** 1 대 다 출근 */
export const useWCM200101SSP02 = () =>
  useMutation({
    mutationFn: async (args: {
      mastCorpCd: string;
      corpCd: string;
      attCd: "I" | "O";
      session: Session;
      img: Blob;
      siteCoorX: string;
      siteCoorY: string;
      idxGrp: string;
    }) => {
      const response = await callWas<StringRspnData<5>>({
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
          "", // 사용자 메모
          args.siteCoorX,
          args.siteCoorY,
          args.idxGrp,
        ],
        formData: [args.img],
      });

      const data = response.svcRspnData?.[0];
      if (!data) throw new Error("FW999");

      return {
        mastCorpCd: data.F01,
        cordCd: data.F02,
        userId: data.F03,
        wrkStrDd: data.F04,
        wrkEndDd: data.F05,
      };
    },
  });

const getTCM200101SSQ01 = async (args: {
  session: Session;
  mastCorpCd: string;
  corpCd: string;
  userId: string;
}) => {
  const result = await callTms<StringRspnData<3>>({
    svcId: "TCM200101SSQ01",
    session: args.session,
    locale: "ko",
    data: [args.mastCorpCd, args.corpCd, args.userId],
  });

  const data = result.svcRspnData?.[0];

  if (!data) {
    throw new Error("FW999");
  }

  return {
    corpNm: data.F01,
    /** 등록 인원 수 */
    ordrCnt: Number(data.F02) || 0,
    /** 출근인원 수 */
    mtchCnt: Number(data.F03) || 0,
  };
};

/** 출퇴근 현황 조회 */
export const useTCM200101SSQ01 = (args: {
  session: Session;
  mastCorpCd: string;
  corpCd: string;
  userId: string;
}) =>
  useQuery({
    queryKey: ["TCM200101SSQ01", args.session, args.mastCorpCd, args.corpCd, args.userId],
    queryFn: () => getTCM200101SSQ01(args),
  });
