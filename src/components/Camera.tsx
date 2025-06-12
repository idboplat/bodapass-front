import { RefObject, useEffect, useState } from "react";
import css from "./Camera.module.scss";
import { clsx } from "clsx";
import { Button } from "@mantine/core";
import { useSetModalStore } from "@/stores/modal";
import { serverLog } from "@/libraries/logger/server";
import { RefreshCw } from "lucide-react";

interface CameraProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  videoRef: RefObject<HTMLVideoElement>;
  isMobile: boolean;
}

export default function Camera({ canvasRef, videoRef, isMobile }: CameraProps) {
  const [error, setError] = useState(false);
  const modalStore = useSetModalStore();
  const [isDetecting, setIsDetecting] = useState(false);

  const connectDevices = async () => {
    if (isDetecting) return;
    try {
      setError(() => false);
      setIsDetecting(() => true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // 후면
          // facingMode: "user", // 전면
          aspectRatio: isMobile ? 9 / 12 : 12 / 9,
        },
      });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("camera error", err);
      serverLog(err);

      const message = "카메라 권한을 요청할 수 없습니다. \n 기기 또는 권한 설정을 확인해주세요.";
      setError(() => true);
      // modalStore.push(ErrorModal, {
      //   props: { error: new Error(message), id: "camera-permission" },
      // });
    } finally {
      setIsDetecting(() => false);
    }
  };

  useEffect(() => {
    connectDevices();
  }, []);

  return (
    <div className={css.camera}>
      <video className={css.video} ref={videoRef} autoPlay muted playsInline></video>
      <canvas className={css.canvas} ref={canvasRef}>
        지원되지않는 기기입니다.
      </canvas>
      {error && (
        <div className={clsx(css.error)}>
          <p className="essential">&nbsp;연결된 기기가 없습니다.</p>
          <div>
            <Button
              variant="light"
              leftSection={<RefreshCw width="1rem" height="1rem" />}
              onClick={connectDevices}
            >
              재시도
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
