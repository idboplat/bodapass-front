import { nativeAlert, sendMessageToDevice } from "@/hooks/use-device-api";
import { useSession } from "@/libraries/auth/use-session";
import { useRouter } from "next/router";
import Capture from "../capture";
import { useTCM200101SSP02 } from "@/hooks/tms/use-attendance";
import { Button } from "@mantine/core";
import { DEVICE_API } from "@/types/common";

interface Props {
  attCd: "I" | "O";
}

export default function SearchHome({ attCd }: Props) {
  const router = useRouter();

  const mastCorpCd = router.query.mastCorpCd?.toString() || "";
  const corpCd = router.query.corpCd?.toString() || "";

  const { data: session } = useSession();
  if (!session) throw new Error("FW401");

  const TCM200101SSP02 = useTCM200101SSP02();

  const onCapture = (args: { image: Blob }) => {
    if (TCM200101SSP02.isPending) return;

    TCM200101SSP02.mutate(
      { img: args.image, mastCorpCd, corpCd, attCd, session },
      {
        onSuccess: async () => {
          nativeAlert("처리되었습니다.");
        },
      },
    );
  };

  const onClickComplete = () => {
    if (window.ReactNativeWebView) {
      sendMessageToDevice({
        type: DEVICE_API.attendanceComplete,
        payload: { mastCorpCd, corpCd },
      });
    }
  };

  return (
    <div className={"mobileLayout"}>
      <Capture onCapture={onCapture} isLoading={TCM200101SSP02.isPending} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Button onClick={onClickComplete}>출석 완료</Button>
      </div>
    </div>
  );
}
