import { RefObject, useEffect, useState } from "react";
import css from "./Camera.module.scss";
import { clsx } from "clsx";
import { Button } from "@mantine/core";
import { useSetModalStore } from "@/stores/modal";
import { serverLog } from "@/libraries/logger/server";
import { RefreshCw } from "lucide-react";
import { useCameraPermission } from "@/hooks/useCamera";

interface CameraProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  videoRef: RefObject<HTMLVideoElement>;
  isMobile: boolean;
}

export default function Camera({ canvasRef, videoRef, isMobile }: CameraProps) {
  const modalStore = useSetModalStore();
  const { connectDevices, isError } = useCameraPermission(videoRef, isMobile);

  useEffect(() => {
    connectDevices();
    return () => {
      const tracks = (videoRef.current?.srcObject as MediaStream)?.getTracks();
      tracks?.forEach((track: MediaStreamTrack) => {
        track.stop();
      });
    };
  }, []);

  return (
    <div className={css.camera}>
      <video className={css.video} ref={videoRef} autoPlay muted playsInline></video>
      <canvas className={css.canvas} ref={canvasRef}>
        {isError && "지원되지않는 기기입니다."}
      </canvas>
      {isError && (
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
