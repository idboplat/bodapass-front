import Capture from "@/components/capture";
import { sendMessageToDevice } from "@/hooks/use-device-api";
import { useSession } from "@/libraries/auth/use-session";
import { LoadingOverlay } from "@mantine/core";
import { useRouter } from "next/router";
import BackHeader from "../common/back-header";
import { useWCW000001SSP01 } from "@/hooks/tms/use-authorization";
import { useQueryClient } from "@tanstack/react-query";
import { DEVICE_API } from "@/types/common";

export default function LeaderFaceHome() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const locale = router.query.locale?.toString() || "ko";

  const next = (router.query.next?.toString() || "") as "" | "true" | "webview";

  const { data: session } = useSession();
  if (!session) throw new Error("FW401");
  /** 반장의 유저 ID */
  const userId = session.userId;

  const WCW000001SSP01 = useWCW000001SSP01();

  const end = () => {
    if (!!window.ReactNativeWebView) {
      sendMessageToDevice({
        type: DEVICE_API.leaderAuthorizationEnd,
        payload: null,
      });
    } else {
      router.back();
    }
  };

  const onCapture = (args: { image: Blob }) => {
    if (WCW000001SSP01.isPending) return;

    WCW000001SSP01.mutate(
      { image: args.image, userId, session },
      {
        onSuccess: async (data) => {
          if (next === "true") {
            router.push(`/${locale}/authorization/leader/bank?next=true`);
          } else if (next === "webview") {
            await queryClient.invalidateQueries({ queryKey: ["WCM200801SSQ01"] });
            router.back();
          } else {
            end();
          }
        },
      },
    );
  };

  return (
    <div className={"mobileLayout"}>
      <Capture onCapture={onCapture} isLoading={WCW000001SSP01.isPending} />
      <LoadingOverlay visible={WCW000001SSP01.isPending} />
    </div>
  );
}
