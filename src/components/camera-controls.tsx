import css from "./camera-controls.module.scss";
import CustomButton from "./common/custom-button";
import SwitchCameraIcon from "/public/assets/svg/camera-switch.svg";
import CameraIcon from "/public/assets/svg/camera.svg";

interface CameraControlsProps {
  cameraMode: "front" | "back";
  onCameraModeChange: (mode: "front" | "back") => void;
  onCapture: () => void;
  isLoading: boolean;
}

export default function CameraControls({
  cameraMode,
  onCameraModeChange,
  onCapture,
  isLoading,
}: CameraControlsProps) {
  return (
    <>
      <div className={css.controls}>
        {!isLoading ? (
          <>
            <CustomButton
              variant="reverse"
              onClick={() => onCameraModeChange(cameraMode === "front" ? "back" : "front")}
              className={css.captureButton}
              leftIcon={<SwitchCameraIcon width="28" height="25" />}
            >
              카메라 반전
            </CustomButton>

            <CustomButton
              onClick={onCapture}
              className={css.captureButton}
              leftIcon={<CameraIcon width="28" height="25" />}
            >
              촬영하기
            </CustomButton>
          </>
        ) : (
          <div className={css.loading}>
            <div className={css.spinner}></div>
            <span>처리 중...</span>
          </div>
        )}
      </div>
    </>
  );
}
