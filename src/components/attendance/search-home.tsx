import { nativeAlert, sendMessageToDevice } from "@/hooks/use-device-api";
import { useSession } from "@/libraries/auth/use-session";
import { useRouter } from "next/router";
import Capture from "../capture";
import { useTCM200101SSP01 } from "@/hooks/tms/use-attendance";
import { Button } from "@mantine/core";

interface Props {
  attCd: "I" | "O";
}

export default function SearchHome({ attCd }: Props) {
  const router = useRouter();

  const mastCorpCd = router.query.mastCorpCd?.toString() || "";
  const corpCd = router.query.corpCd?.toString() || "";
  const userId = router.query.userId?.toString() || "";
  const faceImgFile = router.query.faceImgFile?.toString() || "";

  const { data: session } = useSession();
  if (!session) throw new Error("Session is not found");

  const TCM200101SSP01 = useTCM200101SSP01();

  const setImage = (args: { image: Blob; userId: string }) => {
    if (TCM200101SSP01.isPending) return;

    TCM200101SSP01.mutate(
      { img: args.image, mastCorpCd, corpCd, userId, attCd, faceImgFile, session },
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
        type: "attendanceComplete",
        payload: null,
      });
    }
  };

  return (
    <div className={"mobileLayout"}>
      <Capture onCapture={setImage} isLoading={TCM200101SSP01.isPending} />
      <div>
        <Button onClick={onClickComplete}>완료</Button>
      </div>
    </div>
  );
}
