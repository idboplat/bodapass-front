import { useRef } from "react";

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
        "image/jpeg",
        0.85,
      );
    });
  };

  return { videoRef, canvasRef, capture };
};
