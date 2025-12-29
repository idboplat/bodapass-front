import { useEffect, useRef, RefObject } from "react";
import css from "./camera-view.module.scss";

interface CameraViewProps {
  cameraMode?: "front" | "back";
  // 외부에서 ref에 접근이 필요한 경우에만 사용 (선택적)
  videoRef?: RefObject<HTMLVideoElement | null>;
  canvasRef?: RefObject<HTMLCanvasElement | null>;
}

export default function CameraView({
  cameraMode = "front",
  videoRef: externalVideoRef,
  canvasRef: externalCanvasRef,
}: CameraViewProps) {
  const internalVideoRef = useRef<HTMLVideoElement>(null);
  const internalCanvasRef = useRef<HTMLCanvasElement>(null);

  // 외부 ref가 제공되면 사용하고, 없으면 내부 ref 사용
  const videoRef = externalVideoRef || internalVideoRef;
  const canvasRef = externalCanvasRef || internalCanvasRef;

  // 카메라 스트림 관리
  useEffect(() => {
    let stream: MediaStream | undefined = undefined;

    const getStream = async () => {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: cameraMode === "front" ? "user" : "environment",
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };

    getStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraMode, videoRef]);

  return (
    <div className={css.capture}>
      <video
        className={css.video}
        style={{ transform: cameraMode === "front" ? "scaleX(-1)" : "none" }}
        ref={videoRef}
        autoPlay
        muted
        playsInline
      />
      <canvas className={css.canvas} ref={canvasRef} />
      <div className={css.mask} />
      <div className={css.ring}>
        {Array.from({ length: 60 }).map((_, index) => {
          const angle = index * 6;
          return (
            <div
              key={index}
              className={css.ringTick}
              style={{
                transform: `rotate(${angle}deg) translateY(-9.5rem)`,
                animationDelay: `${index * 0.1}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
