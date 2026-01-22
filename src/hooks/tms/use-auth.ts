import { frontApi } from "@/apis/fetcher";
import { TSignInDto, TSignUpDto } from "@/libraries/auth/auth.dto";
import { callTms, callWas, FillerRspnData, StringRspnData } from "@/libraries/call-tms";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { nativeAlert, sendMessageToDevice } from "../use-device-api";
import { SESSION_LOCAL_STORAGE_KEY } from "@/constants";
import { DEVICE_API, Promised, TIdTp, TLoginTp, TWrkTp } from "@/types/common";
import { TmsError } from "@/libraries/error";

/**
 * 01: 회원 가입
 * 02: 아이디 찾기
 * 11: 로그인
 * 21: 비밀번호 변경
 * 22: otp 초기화
 */
export type TCetTp = "01" | "02" | "11" | "21" | "22";

/** E: 이메일, M: 모바일 */
export type TCetRecvTp = "E" | "M";

export const useKakaoLoginMutation = () => {
  const mutation = useMutation({
    mutationFn: ({ code }: { code: string }) =>
      frontApi
        .post<{ session: Session } | { token: { externalId: string; code: string } }>(
          "api/auth/signin/kakao",
          { headers: { "X-CODE": code } },
        )
        .json(),
    retry: 0, // 카카오 로그인 실패 시 재시도 방지
  });

  return { mutation };
};

export const useEmailLoginMutation = () => {
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: (dto: TSignInDto) =>
      frontApi
        .post<{ session: Session }>("api/auth/signin", {
          json: dto,
        })
        .json()
        .then((json) => json.session),
    onMutate: () => setIsLoading(() => true),
    onSuccess: async (data, _variables) => {
      if (!!window.ReactNativeWebView) {
        await sendMessageToDevice({
          type: DEVICE_API.updateDeviceSession,
          payload: data,
        } satisfies {
          type: string;
          payload: Session;
        });
      } else {
        // 테스트 로그인
        localStorage.setItem(SESSION_LOCAL_STORAGE_KEY, JSON.stringify(data));
        const result = confirm("테스트 로그인 성공");

        if (result) {
          window.location.href = "/";
        }
      }
    },
    onError: async (error) => {
      nativeAlert(error.message);
      setIsLoading(() => false);
    },
  });

  return {
    isLoading,
    mutation,
  };
};

/**
 * 공통 신분증 조회
 *
 * 반장의 경우 brkrId 공백 처리
 */
export const useWCW000002SSQ01 = () =>
  useMutation({
    mutationFn: async (args: {
      image: Blob;
      brkrId: string;
      idTp: TIdTp;
      session: Session | null;
    }) => {
      const result = await callWas<StringRspnData<3>>({
        svcId: "WCW000002SSQ01", // 매칭되는 svcId 없음
        apiPathName: "WCW000002SSQ01",
        locale: "ko",
        session: args.session,
        data: [args.brkrId, args.idTp],
        formData: [args.image],
      });

      const data = result.svcRspnData?.[0];

      if (!data) throw new Error("FW999");

      return {
        userNm: data.F01,
        id1: data.F02,
        id2: data.F03,
        image: args.image,
        idTp: args.idTp,
      };
    },
  });

export const useWCW000001SSP02 = () => {
  /** 데이터 패칭 여부가 아니라 성공 여부에 따라 로딩 처리 */
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (
      args: TSignUpDto & {
        session: Session | null;
        loginTp: TLoginTp;
        wrkTp: TWrkTp;
        idTp: TIdTp;
        brkrId: string;
        image: [
          Blob | string, // 앞면
          Blob | string, // 뒷면
        ];
      },
    ) => {
      const response = await callWas<StringRspnData<1>>({
        apiPathName: "WCW000001SSP02",
        svcId: "TCW000001SSP02",
        session: args.session,
        locale: "ko",
        data: [
          args.userNm,
          [args.idNo1, args.idNo2].join("-"),
          args.idTp,
          args.addr,
          args.addrDtil,
          args.tel1,
          args.tel2,
          args.tel3,
          args.zipCd,
          args.wrkTp,
          args.exterUserId,
          args.loginTp,
          args.password,
          args.cntryCd,
          args.brkrId,
          args.corpCd,
          args.emailAddr,
          args.isuDd,
          args.idSn,
          args.visaCd, // ex) F-4, E-9
        ],
        formData: args.image,
      });

      const data = response.svcRspnData?.[0];

      if (!data) throw new Error("FW999");

      return { userId: data.F01 };
    },
    onMutate: () => setIsLoading(() => true),
    onError: (error) => {
      nativeAlert(error.message);
      setIsLoading(() => false);
    },
  });

  return {
    isLoading,
    mutation,
  };
};

/** 반장 아이디 조회 */
export const useTCM200001SSQ00 = () =>
  useMutation({
    mutationFn: async (args: { brkrId: string }) => {
      const res = await callTms<StringRspnData<1>>({
        svcId: "TCM200001SSQ00",
        session: null,
        locale: "ko",
        data: [args.brkrId],
      });

      const data = res.svcRspnData?.[0];

      if (!data) throw new Error("FW999");

      return data;
    },
  });

/** 공통 인증번호 요청 */
export const useTCM200001SSP04 = () =>
  useMutation({
    mutationFn: async (args: {
      userId: string;
      userNm: string;
      idNo: string;
      telNo: string;
      cetTp: TCetTp;
      cetRecvTp: TCetRecvTp;
    }) => {
      const result = await callTms<FillerRspnData>({
        svcId: "TCM200001SSP04",
        locale: "ko",
        session: null,
        data: [args.userId, args.userNm, args.idNo, args.telNo, args.cetTp, args.cetRecvTp],
      });

      const data = result.svcRspnData?.[0];

      if (!data) throw new Error("FW999");

      return data;
    },
  });

/**
 * 인증번호 확인
 *
 * 아이디 찾기시에는 사용하지 않는다.
 */
export const useTCM200001SSP05 = () =>
  useMutation({
    mutationFn: async (args: { userId: string; cetTp: TCetTp; cetNo: string }) => {
      const result = await callTms<FillerRspnData>({
        svcId: "TCM200001SSP05",
        locale: "ko",
        session: null,
        data: [args.userId, args.cetTp, args.cetNo],
      });

      const data = result.svcRspnData?.[0];

      if (!data) throw new Error("FW999");

      return data;
    },
  });

/** 비밀번호 재설정 - 이메일 로그인 비밀번호 변경 */
export const useTCM200001SSP06 = () =>
  useMutation({
    mutationFn: async (args: {
      userId: string;
      userPswd: string;
      cetTp: TCetTp;
      cetNo: string;
    }) => {
      const result = await callTms<FillerRspnData>({
        svcId: "TCM200001SSP06",
        locale: "ko",
        session: null,
        data: [args.userId, args.userPswd, args.cetTp, args.cetNo],
      });

      const data = result.svcRspnData?.[0];

      if (!data) throw new Error("FW999");

      return data;
    },
  });

const getTCM200001SMQ01 = async (args: {
  userNm: string;
  idNo: string;
  telNo: string;
  cetTp: TCetTp;
  cetNo: string;
}) => {
  const res = await callTms<StringRspnData<3>>({
    svcId: "TCM200001SMQ01",
    locale: "ko",
    session: null,
    data: [args.userNm, args.idNo, args.telNo, args.cetTp, args.cetNo],
  });

  const data = res.svcRspnData || [];

  return data.map((d) => ({
    extnUserId: d.F01,
    loginTp: d.F02,
    creWrkDtm: d.F03,
  }));
};

export type TTCM200001SMQ01Data = Promised<typeof getTCM200001SMQ01>;
export type TTCM200001SMQ01RowData = TTCM200001SMQ01Data[number];

/** 아이디 찾기 */
export const useTCM200001SMQ01 = (args: {
  userNm: string;
  idNo: string;
  telNo: string;
  cetTp: TCetTp;
  cetNo: string;
}) =>
  useQuery({
    queryKey: [
      "TCM200001SMQ01",
      args.userNm,
      args.idNo,
      args.telNo,
      args.cetTp,
      args.cetNo,
      "ignore",
    ],
    queryFn: () => getTCM200001SMQ01(args),
    retry: (failureCount, error) => {
      if (error instanceof TmsError && error.errCode === "10017") {
        // 인증번호 오류일 경우 재시도 하지 않음
        return false;
      }

      return failureCount < 2;
    },
  });
