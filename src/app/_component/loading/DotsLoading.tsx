import css from "./DotsLoading.module.scss";

export default function DotsLoading() {
  return (
    <div className={css.wrap}>
      <div className={css.box}>
        <span className={css.circle} />
        <span className={css.circle} />
        <span className={css.circle} />
      </div>
    </div>
  );
}
