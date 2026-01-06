import Capture from "@/components/capture";
import { sendMessageToDevice } from "@/hooks/use-device-api";
import { useSession } from "@/libraries/auth/use-session";
import { LoadingOverlay } from "@mantine/core";
import { useRouter } from "next/router";
import { useWCW000001SSP01 } from "@/hooks/tms/use-authorization";
import { useQueryClient } from "@tanstack/react-query";
import { DEVICE_API } from "@/types/common";
import CustomStep from "../common/custom-step";
import css from "./crew-face-home.module.scss";

export default function CrewFaceHome() {
  const router = useRouter();
  const queryClient = useQueryClient();

  /** 근로자의 유저 ID */
  const userId = router.query.userId?.toString() || "";
  const next = (router.query.next?.toString() || "") as "" | "true" | "webview";

  const { data: session } = useSession();
  if (!session) throw new Error("FW401");

  const WCW000002SSP01 = useWCW000001SSP01();

  const end = () => {
    if (!!window.ReactNativeWebView) {
      sendMessageToDevice({
        type: DEVICE_API.crewAuthorizationEnd,
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
        onSuccess: async (data) => {
          if (next === "true") {
            router.push(`/ko/authorization/crew/${data.userId}/bank?next=true`);
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
    <div className={`${css.container} mobileLayout`}>
      <CustomStep currentStep={1} totalSteps={4} />
      <Capture onCapture={onCapture} isLoading={WCW000002SSP01.isPending} />
      <LoadingOverlay visible={WCW000002SSP01.isPending} />
    </div>
  );
}
