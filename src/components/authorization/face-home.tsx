import CaptureComponent from "@/components/capture";
import { sendMessageToDevice } from "@/hooks/use-device-api";
import { useDto } from "@/hooks/use-dto";
import { useSession } from "@/libraries/auth/use-session";
import { callWas } from "@/libraries/call-tms";
import { StringRspn } from "@/types/api";
import { LoadingOverlay } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import BackHeader from "../common/back-header";
import { TFaceDto } from "./dto";

export default function FaceHome() {
  const { data: session } = useSession();
  if (!session) throw new Error("Session is not found");

  const router = useRouter();
  const dto = useDto<TFaceDto>();

  const mutation = useMutation({
    mutationFn: async (args: { image: Blob; userId: string }) => {
      const result = await callWas<StringRspn<1>>({
        svcId: "TCW000002SSP01",
        apiPathName: "WCW000002SSP01",
        data: [args.userId, "jpeg", ""],
        locale: "ko",
        session,
        formData: [args.image],
      });

      const data = result.svcRspnData?.[0];

      if (!data) throw new Error("FCM999");

      return { faceId: data.F01, userId: args.userId };
    },
    onSuccess: (data) => router.replace(`/ko/authorization/crew/${data.userId}/bank`),
  });

  const onClickBack = () => {
    if (window.ReactNativeWebView) {
      sendMessageToDevice({
        type: "authorizationEnd",
        payload: null,
      });
    }
  };
  const setImage = (args: { image: Blob; score: number }) => {
    if (!dto.userId) return;

    if (mutation.isPending) return;
    mutation.mutate({ image: args.image, userId: dto.userId });
  };

  return (
    <div className={"mobileLayout"}>
      <BackHeader title="얼굴등록" onClickBack={onClickBack} />
      <div>유저 ID: {dto.userId}</div>
      <CaptureComponent mutate={setImage} isPending={mutation.isPending} />
      <LoadingOverlay visible={mutation.isPending} />
    </div>
  );
}
