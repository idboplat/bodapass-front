import { Loader } from "@mantine/core";
import css from "./ScreenLoading.module.scss";

export default function ScreenLoading() {
  return (
    <div className={css.loaderBox}>
      <Loader />
    </div>
  );
}
