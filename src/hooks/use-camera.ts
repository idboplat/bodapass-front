import { nativeLogger } from "@/hooks/use-device-api";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";

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
  // const [isDetecting, setIsDetecting] = useState(false);

  const connectDevices = useCallback(async () => {
    // if (isDetecting) return;
    try {
      setIsError(() => false);
      // setIsDetecting(() => true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // 후면
          // facingMode: "user", // 전면
          aspectRatio: isMobile ? 9 / 12 : 12 / 9,
        },
      });
      videoRef.current.srcObject = stream;

      return stream;
    } catch (error) {
      console.error("camera error", error);
      nativeLogger(error instanceof Error ? error.message : "camera error");

      setIsError(() => true);
    } finally {
      // setIsDetecting(() => false);
    }
  }, [videoRef, isMobile]);

  useEffect(() => {
    let stream: MediaStream | undefined = undefined;
    connectDevices().then((s) => (stream = s));

    console.log("videoRef", videoRef.current);
    return () => {
      // 카메라 연결해제
      if (stream) {
        stream.getTracks().forEach((track) => {
          console.log("track", track);
          track.stop();
        });
      }
    };
  }, [connectDevices, videoRef]);

  return {
    isError,
    connectDevices,
  };
};
