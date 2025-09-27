import css from "./camera-frame.module.scss";

export default function IdcardFrame() {
  return (
    <div className={css.idCardFrame}>
      <div className={css.idCardFrameCorner}></div>
      <div className={css.idCardFrameCorner}></div>
      <div className={css.idCardFrameCorner}></div>
      <div className={css.idCardFrameCorner}></div>
    </div>
  );
}
