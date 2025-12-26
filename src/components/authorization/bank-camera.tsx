import { ActionIcon } from "@mantine/core";
import BackHeader from "../common/back-header";
import Camera from "../camera";
import clsx from "clsx";
import CameraFrame from "../common/camera-frame";
import { Camera as IconCamera } from "lucide-react";
import css from "./bank-camera.module.scss";
import { useCamera } from "@/hooks/use-camera";
import { useSession } from "@/libraries/auth/use-session";
import CustomStep from "../common/custom-step";
import CustomButton from "../common/custom-button";

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
    <div className={css.wrap}>
      <CustomStep currentStep={2} totalSteps={4} />

      <div className={clsx(css.cameraBox)}>
        <Camera videoRef={camera.videoRef} canvasRef={camera.canvasRef} isMobile={true} />
        <CameraFrame />
      </div>

      <div className={css.infoBox}>
        <div className={css.infoItem}>
          <div className={css.numberCircle}>1</div>
          <p>통장의 앞면이 보이도록 놓아주세요. 어두운 바닥에 놓으면 더 잘 인식됩니다.</p>
        </div>
        <div className={css.infoItem}>
          <div className={css.numberCircle}>2</div>
          <p>
            가이드 영역에 맞추어 반드시 <span>통장 원본</span>으로 촬영하세요.
          </p>
        </div>
        <div className={css.infoItem}>
          <div className={css.numberCircle}>3</div>
          <p>
            빛 반사에 주의하세요. 정보 확인이 어렵거나, 훼손/유효하지 않은 통장은{" "}
            <span>거절되거나 이후 이용이 제한</span>될 수 있습니다.
          </p>
        </div>
        <div className={css.infoItem}>
          <div className={css.numberCircle}>4</div>
          <p>
            제출 시 <span>주변 영역도 포함</span>되니 촬영시 주의해 주세요.
          </p>
        </div>
      </div>

      <div>
        <CustomButton type="button" fullWidth onClick={onClickCapture}>
          사진찍기
        </CustomButton>
      </div>

      {/* <LoadingOverlay visible={mutation.isPending} /> */}
    </div>
  );
}
