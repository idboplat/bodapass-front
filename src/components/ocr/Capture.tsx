import Link from "next/link";
import { ActionIcon } from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { MutableRefObject } from "react";
import Camera from "@/components/Camera";
import css from "./Ocr.module.scss";

type Props = {
  videoRef: MutableRefObject<HTMLVideoElement>;
  canvasRef: MutableRefObject<HTMLCanvasElement>;
  onClickCapture: () => void;
  isMobile: boolean;
};

export default function Capture({ canvasRef, videoRef, onClickCapture, isMobile }: Props) {
  return (
    <div className={css.cameraBox}>
      <Camera videoRef={videoRef} canvasRef={canvasRef} isMobile={isMobile} />
      <div className={css.descBox}>
        <div className={css.desc}>
          <Link href="">
            <p className={css.help}>
              <u>화면이 보이지 않을때</u>
            </p>
          </Link>

          <p>신원정보가 명확히 보여야 합니다.</p>

          <p>신분증의 내 모서리가 모두 나와야 합니다.</p>

          <p>신분증이 가려지지 안항야 합니다.</p>
          <div className={css.shutterBox}>
            <ActionIcon variant="touch" w="5rem" h="5rem" onClick={onClickCapture} radius={9999}>
              <IconCamera width="4rem" height="4rem" />
            </ActionIcon>
          </div>
        </div>
      </div>
    </div>
  );
}
