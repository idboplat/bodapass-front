import * as style from "./dotsLoading.css";

export default function DotsLoading() {
  return (
    <div className={style.wrap}>
      <div className={style.box}>
        <span className={style.circle} />
        <span className={style.circle} />
        <span className={style.circle} />
      </div>
    </div>
  );
}
