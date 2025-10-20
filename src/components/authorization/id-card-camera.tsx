import { useCamera } from "@/hooks/use-camera";
import Camera from "../camera";
import { ActionIcon, LoadingOverlay, Select } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import css from "./id-card-camera.module.scss";
import { Camera as IconCamera } from "lucide-react";
import IdcardFrame from "../common/camera-frame";
import { TOCR } from "@/libraries/auth/auth.dto";

interface Props {
  camera: ReturnType<typeof useCamera>;
  brkrId?: string;
  type: TOCR;
  isLoading: boolean;
  setType: Dispatch<SetStateAction<TOCR>>;
  onClickCapture: () => void;
}

export default function IdcardCamera({
  camera,
  type,
  setType,
  onClickCapture,
  brkrId,
  isLoading,
}: Props) {
  return (
    <>
      {brkrId && <div className={css.brkrId}>반장 ID: {brkrId}</div>}
      <div className={css.nav}>
        <Select
          data={[
            { value: "idcard", label: "주민등록증" },
            { value: "driver", label: "운전면허증" },
            { value: "alien", label: "외국인등록증" },
            // { value: "passport", label: "국내여권" },
            // { value: "passport-overseas", label: "해외여권" },
            // { value: "alien-back", label: "외국인등록증 뒷면" },
          ]}
          value={type}
          onChange={(value) => setType(value as TOCR)}
        />
      </div>

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
          loading={isLoading}
        >
          <IconCamera width="2.5rem" height="2.5rem" />
        </ActionIcon>
      </div>

      <LoadingOverlay visible={isLoading} />
    </>
  );
}
