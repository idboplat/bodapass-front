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
  const next = router.query.next?.toString() === "true";

  const { data: session } = useSession();
  if (!session) throw new Error("Session is not found");

  const WCW000002SSP01 = useWCW000002SSP01();

  const end = () => {
    if (!!window.ReactNativeWebView) {
      sendMessageToDevice({
        type: "authorizationEnd",
        payload: null,
      });
    } else {
      router.back();
    }
  };

  const onCapture = (args: { image: Blob }) => {
    if (WCW000002SSP01.isPending) return;

    WCW000002SSP01.mutate(
      { image: args.image, userId, session },
      {
        onSuccess: (data) => {
          if (next) {
            router.replace(`/ko/authorization/crew/${data.userId}/bank?next=true`);
          } else {
            end();
          }
        },
      },
    );
  };

  return (
    <div className={"mobileLayout"}>
      <BackHeader title="얼굴등록" onClickBack={end} />
      <div>유저 ID: {userId}</div>
      <Capture onCapture={onCapture} isLoading={WCW000002SSP01.isPending} />
      <LoadingOverlay visible={WCW000002SSP01.isPending} />
    </div>
  );
}
