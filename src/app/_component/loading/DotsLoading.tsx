import module from "./DotsLoading.module.scss";

export default function DotsLoading() {
  return (
    <div className={module.wrap}>
      <div className={module.box}>
        <span className={module.circle} />
        <span className={module.circle} />
        <span className={module.circle} />
      </div>
    </div>
  );
}
