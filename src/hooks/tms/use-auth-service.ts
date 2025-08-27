import { frontApi } from "@/apis/fetcher";
import { TSignInDto, TSignUpDto } from "@/libraries/auth/auth.dto";
import { callTms, StringRspnData } from "@/libraries/call-tms";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { sendMessageToDevice } from "../use-device-api";

export const useKakaoLoginMutation = ({ locale }: { locale: string }) => {
  const mutation = useMutation({
    mutationFn: ({ code }: { code: string }) =>
      frontApi
        .post<{ session: Session } | { token: { externalId: string; code: string } }>(
          "api/auth/token/kakao",
          { headers: { "X-CODE": code } },
        )
        .json(),
    retry: 0, // 카카오 로그인 실패 시 재시도 방지
  });

  return { mutation };
};

export const useEmailLoginMutation = ({ locale }: { locale: string }) => {
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
      await sendMessageToDevice({
        type: "updateDeviceSession",
        payload: data,
      });
    },
    onError: async (error) => {
      alert(error.message);
      setIsLoading(() => false);
    },
  });

  return {
    isLoading,
    mutation,
  };
};

export const useSignupMutation = ({ locale }: { locale: string }) => {
  /** 데이터 패칭 여부가 아니라 성공 여부에 따라 로딩 처리 */
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: (dto: TSignUpDto) =>
      callTms<StringRspnData<1>>({
        svcId: "TCM200001SSP00",
        session: null,
        locale,
        data: [
          dto.externalId,
          [dto.tel1, dto.tel2, dto.tel3].join(""),
          dto.userName,
          dto.loginTp,
          dto.password,
          dto.address,
          dto.addressDetail,
          dto.zipCode,
          dto.contryCode,
          dto.workerTp,
          dto.brokerId,
        ],
      }),
    onMutate: () => setIsLoading(() => true),
    onError: (error) => {
      alert(error.message);
      setIsLoading(() => false);
    },
  });

  return {
    isLoading,
    mutation,
  };
};

export const useCheckBrokerMutation = ({ locale }: { locale: string }) => {
  const mutation = useMutation({
    mutationFn: ({ brokerId }: { brokerId: string }) =>
      callTms<StringRspnData<1>>({
        svcId: "TCM200001SSQ00",
        session: null,
        locale,
        data: [brokerId],
      }),
  });

  return {
    mutation,
  };
};
