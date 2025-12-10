import { ActionIcon } from "@mantine/core";
import BackHeader from "../common/back-header";
import Camera from "../camera";
import clsx from "clsx";
import IdcardFrame from "../common/camera-frame";
import { Camera as IconCamera } from "lucide-react";
import css from "./bank-home.module.scss";
import { useCamera } from "@/hooks/use-camera";
import { useSession } from "@/libraries/auth/use-session";

interface Props {
  setBankImage: (bankImageSrc: Blob) => void;
  userId: string;
}

export default function BankCamera({ setBankImage, userId }: Props) {
  const { data: session } = useSession();
  if (!session) throw new Error("FW401");

  const camera = useCamera();

  const onClickCapture = async () => {
    try {
      const blob = await camera.capture();
      if (!blob) {
        console.error("이미지 캡쳐 실패");
        return;
      }

      setBankImage(blob);
    } catch (error) {
      console.error("카메라 캡쳐 중 오류:", error);
    }
  };

  return (
    <>
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
    </>
  );
}
