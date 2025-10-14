import Capture from "@/components/capture";
import { sendMessageToDevice } from "@/hooks/use-device-api";
import { useSession } from "@/libraries/auth/use-session";
import { LoadingOverlay } from "@mantine/core";
import { useRouter } from "next/router";
import BackHeader from "../common/back-header";
import { useWCW000002SSP01 } from "@/hooks/tms/use-authorization";

export default function CrewFaceHome() {
  const router = useRouter();
  /** 근로자의 유저 ID */
  const userId = router.query.userId?.toString() || "";

  const { data: session } = useSession();
  if (!session) throw new Error("Session is not found");

  const WCW000002SSP01 = useWCW000002SSP01();

  const onClickBack = () => {
    if (window.ReactNativeWebView) {
      sendMessageToDevice({
        type: "authorizationEnd",
        payload: null,
      });
    }
  };

  const setImage = (args: { image: Blob; score: number }) => {
    if (WCW000002SSP01.isPending) return;

    WCW000002SSP01.mutate(
      { image: args.image, userId, session },
      {
        onSuccess: (data) => router.replace(`/ko/authorization/crew/${data.userId}/bank`),
      },
    );
  };

  return (
    <div className={"mobileLayout"}>
      <BackHeader title="얼굴등록" onClickBack={onClickBack} />
      <div>유저 ID: {userId}</div>
      <Capture onCapture={setImage} isLoading={WCW000002SSP01.isPending} session={session} />
      <LoadingOverlay visible={WCW000002SSP01.isPending} />
    </div>
  );
}
