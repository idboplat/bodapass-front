import { RefObject, useCallback } from "react";

interface UseCameraCaptureProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  cameraMode: "front" | "back";
  onCapture?: (blob: Blob) => void;
}

export function useCameraCapture({ videoRef, cameraMode, onCapture }: UseCameraCaptureProps) {
  const capture = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.pause();

    const captureCanvas = document.createElement("canvas");
    captureCanvas.width = videoRef.current.videoWidth;
    captureCanvas.height = videoRef.current.videoHeight;

    // 좌우 반전을 위한 변환 적용
    if (cameraMode === "front") {
      captureCanvas.getContext("2d")!.scale(-1, 1);
      captureCanvas.getContext("2d")!.translate(-captureCanvas.width, 0);
    }

    captureCanvas
      .getContext("2d")
      ?.drawImage(videoRef.current, 0, 0, captureCanvas.width, captureCanvas.height);

    captureCanvas.getContext("2d")!.resetTransform();
    captureCanvas.getContext("2d")!.font = "20px Arial";
    captureCanvas.getContext("2d")!.fillStyle = "red";
    captureCanvas.getContext("2d")!.fillText("0", 0, 32);

    // 해상도 정보 출력
    console.log("촬영 이미지 해상도:", {
      width: captureCanvas.width,
      height: captureCanvas.height,
      aspectRatio: (captureCanvas.width / captureCanvas.height).toFixed(2),
    });

    // Blob 생성
    captureCanvas.toBlob(
      (blob) => {
        if (blob) {
          onCapture?.(blob);
        }

        // 메모리 정리
        captureCanvas.getContext("2d")?.clearRect(0, 0, captureCanvas.width, captureCanvas.height);
        captureCanvas.width = 0;
        captureCanvas.height = 0;
        captureCanvas.remove();

        videoRef.current?.play();
      },
      "image/jpeg",
      1.0,
    );
  }, [videoRef, cameraMode, onCapture]);

  return { capture };
}
