import { serverLog } from "@/libraries/logger/server";
import { RefObject, useRef, useState } from "react";

export const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  const clearCanvas = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const capture = (): Promise<Blob | null> => {
    videoRef.current.pause();
    const ctx = canvasRef.current.getContext("2d")!;
    clearCanvas(ctx);
    const { width, height } = videoRef.current.getBoundingClientRect();
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    ctx.drawImage(videoRef.current, 0, 0, width, height);

    return new Promise((resolve) => {
      canvasRef.current.toBlob(
        (blob) => {
          clearCanvas(ctx);
          videoRef.current.play();
          resolve(blob);
        },
        "image/png",
        0.85,
      );
    });
  };

  return { videoRef, canvasRef, capture };
};

export const useCameraPermission = (videoRef: RefObject<HTMLVideoElement>, isMobile: boolean) => {
  const [isError, setIsError] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);

  const connectDevices = async () => {
    if (isDetecting) return;
    try {
      setIsError(() => false);
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
      setIsError(() => true);
      // modalStore.push(ErrorModal, {
      //   props: { error: new Error(message), id: "camera-permission" },
      // });
    } finally {
      setIsDetecting(() => false);
    }
  };

  return {
    isError,
    isDetecting,
    connectDevices,
  };
};
