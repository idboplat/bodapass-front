import { ActionIcon, LoadingOverlay } from "@mantine/core";
import BackHeader from "../common/back-header";
import Camera from "../camera";
import { useDto } from "@/hooks/use-dto";
import { TBankDto } from "./dto";
import Redirect from "../common/redirect";
import { useRouter } from "next/router";
import clsx from "clsx";
import IdcardFrame from "./camera-frame";
import { Camera as IconCamera } from "lucide-react";
import css from "./bank-home.module.scss";
import { useCamera } from "@/hooks/use-camera";
import { useMutation } from "@tanstack/react-query";
import { callWas, StringRspnData } from "@/libraries/call-tms";
import { sendMessageToDevice } from "@/hooks/use-device-api";
import { useSession } from "@/libraries/auth/use-session";

interface Props {
  setStep: (step: "camera" | "form") => void;
  setBankImageSrc: (bankImageSrc: Blob) => void;
  bankDto: TBankDto;
}

export default function BankCamera({ setStep, setBankImageSrc, bankDto }: Props) {
  const { data: session } = useSession();
  if (!session) throw new Error("Session is not found");

  const router = useRouter();

  const camera = useCamera();

  const onClickBack = () =>
    sendMessageToDevice({
      type: "authorizationEnd",
      payload: null,
    });

  const onClickCapture = async () => {
    try {
      const blob = await camera.capture();
      if (!blob) {
        console.error("이미지 캡쳐 실패");
        return;
      }

      setBankImageSrc(blob);
      setStep("form");
    } catch (error) {
      console.error("카메라 캡쳐 중 오류:", error);
    }
  };

  if (!bankDto.userId) return <Redirect to="/not-found" />;

  return (
    <div className={"mobileLayout"}>
      <BackHeader title="통장등록" onClickBack={onClickBack} />
      <div>유저 ID: {bankDto.userId}</div>

      <div className={clsx(css.cameraBox)}>
        <Camera videoRef={camera.videoRef} canvasRef={camera.canvasRef} isMobile={true} />
        <IdcardFrame />
      </div>

      <div className={css.shutterBox}>
        <ActionIcon
          variant="touch"
          w="5rem"
          h="5rem"
          onClick={onClickCapture}
          radius={9999}
          // loading={mutation.isPending}
        >
          <IconCamera width="2.5rem" height="2.5rem" />
        </ActionIcon>
      </div>

      {/* <LoadingOverlay visible={mutation.isPending} /> */}
    </div>
  );
}
