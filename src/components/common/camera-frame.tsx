import css from "./camera-frame.module.scss";

export default function CameraFrame() {
  return (
    <>
      <div className={css.cameraFrameOverlay}></div>
      <div className={css.cameraFrameOverlayLeft}></div>
      <div className={css.cameraFrameOverlayRight}></div>
      <div className={css.cameraFrame}>
        <div className={css.cameraFrameCorner}></div>
        <div className={css.cameraFrameCorner}></div>
        <div className={css.cameraFrameCorner}></div>
        <div className={css.cameraFrameCorner}></div>
        <div className={css.cameraFrameCross}></div>
      </div>
      <div className={css.cameraFrameGuide}>가이드 라인에 신분증을 맞춰주세요.</div>
    </>
  );
}
