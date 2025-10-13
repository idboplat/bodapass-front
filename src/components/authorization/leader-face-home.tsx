import Capture from "@/components/capture";
import { sendMessageToDevice } from "@/hooks/use-device-api";
import { useSession } from "@/libraries/auth/use-session";
import { LoadingOverlay } from "@mantine/core";
import { useRouter } from "next/router";
import BackHeader from "../common/back-header";
import { useWCW000001SSP01 } from "@/hooks/tms/use-authorization";

export default function LeaderFaceHome() {
  const { data: session } = useSession();
  if (!session) throw new Error("Session is not found");
  /** 반장의 유저 ID */
  const userId = session.userId;

  const router = useRouter();

  const WCW000001SSP01 = useWCW000001SSP01();

  const onClickBack = () => {
    if (window.ReactNativeWebView) {
      sendMessageToDevice({
        type: "authorizationEnd",
        payload: null,
      });
    }
  };

  const setImage = (args: { image: Blob; score: number }) => {
    if (WCW000001SSP01.isPending) return;

    WCW000001SSP01.mutate(
      { image: args.image, userId, session },
      {
        onSuccess: (data) => router.replace(`/ko/authorization/leader/bank`),
      },
    );
  };

  return (
    <div className={"mobileLayout"}>
      <BackHeader title="얼굴등록" onClickBack={onClickBack} />
      <div>유저 ID: {userId}</div>
      <Capture mutate={setImage} isPending={WCW000001SSP01.isPending} session={session} />
      <LoadingOverlay visible={WCW000001SSP01.isPending} />
    </div>
  );
}
