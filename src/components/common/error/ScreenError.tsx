import { Button, Loader } from "@mantine/core";
import css from "./ScreenError.module.scss";
import { FallbackProps } from "react-error-boundary";

interface Props extends FallbackProps {}

export default function ScreenError({ error, resetErrorBoundary }: Props) {
  return (
    <div className={css.errorBox}>
      <p>에러가 발생하였습니다.</p>
      <Button variant="light" onClick={resetErrorBoundary}>
        다시 시도
      </Button>
    </div>
  );
}
