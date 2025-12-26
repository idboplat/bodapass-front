import { useWCW000002SSQ01 } from "@/hooks/tms/use-auth";
import { useCamera } from "@/hooks/use-camera";
import { nativeAlert } from "@/hooks/use-device-api";
import { TScannedResult } from "@/libraries/auth/auth.dto";
import { ActionIcon, Select } from "@mantine/core";
import css from "./step-3.module.scss";
import CameraFrame from "../common/camera-frame";
import clsx from "clsx";
import { Camera as IconCamera } from "lucide-react";
import Camera from "../camera";
import { TIdTp } from "@/types/common";
import { useRouter } from "next/router";
import CustomStep from "../common/custom-step";
import CustomButton from "../common/custom-button";

export default function Step3({
  idTp,
  locale,
  onClickNext,
  onClickPrev,
}: {
  idTp: TIdTp;
  locale: string;
  onClickPrev: () => void;
  onClickNext: (args: TScannedResult) => void;
}) {
  const router = useRouter();
  const camera = useCamera();

  const WCW000002SSQ01 = useWCW000002SSQ01();

  const onClickCapture = async () => {
    try {
      if (WCW000002SSQ01.isPending) return;

      const image = await camera.capture();
      if (!image) throw new Error("이미지 캡쳐 실패");

      WCW000002SSQ01.mutate(
        { image, brkrId: "", idTp, session: null },
        {
          onSuccess: onClickNext,
        },
      );
    } catch (error) {
      console.log("error", error);
      nativeAlert("이미지 캡쳐 실패");
    }
  };

  return (
    <div>
      <CustomStep totalSteps={4} currentStep={3} />

      <div className={css.nav}>
        <div className={css.navText}>
          <p>
            본인 확인을 위해 <span>주민등록증</span> 또는 <span>운전면허증</span>,
          </p>
          <p>
            <span>외국인 등록증</span>을 준비해주세요.
          </p>
        </div>
        <Select
          data={[
            { value: "1", label: "주민등록증" },
            { value: "2", label: "운전면허증" },
            { value: "3", label: "외국인등록증" },
          ]}
          value={idTp}
          onChange={(value) => {
            if (!value) return;
            const searchParams = new URLSearchParams(router.asPath.split("?")[1]);
            searchParams.set("idTp", value as TIdTp);
            router.replace(`/${locale}/signup/?${searchParams.toString()}`);
          }}
        />
      </div>

      <div className={clsx(css.cameraBox)}>
        <Camera videoRef={camera.videoRef} canvasRef={camera.canvasRef} isMobile={true} />
        <CameraFrame />
      </div>

      <div className={css.infoBox}>
        <div className={css.infoItem}>
          <div className={css.numberCircle}>1</div>
          <p>신분증의 앞면이 보이도록 놓아주세요. 어두운 바닥에 놓으면 더 잘 인식됩니다.</p>
        </div>
        <div className={css.infoItem}>
          <div className={css.numberCircle}>2</div>
          <p>
            가이드 영역에 맞추어 반드시 <span>신분증 원본</span>으로 촬영하세요.
          </p>
        </div>
        <div className={css.infoItem}>
          <div className={css.numberCircle}>3</div>
          <p>
            빛 반사에 주의하세요. 정보 확인이 어렵거나, 훼손/유효하지 않은 신분증은{" "}
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
    </div>
  );
}
