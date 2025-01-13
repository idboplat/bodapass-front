// components/VideoCapture.tsx

import { useEffect, useRef, useState } from "react";

interface VideoCaptureProps {
  onFaceDetected: (image: Blob) => void;
}

const VideoCapture: React.FC<VideoCaptureProps> = ({ onFaceDetected }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current!.srcObject = stream;
        })
        .catch((err) => {
          console.error("웹캠 접근 오류:", err);
        });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const canvas = canvasRef.current!;
      if (videoRef.current && canvasRef.current) {
        // 프레임을 Blob으로 캡처하여 백엔드로 전송
        videoRef.current.pause();
        canvas.toBlob(
          (blob) => {
            if (blob) {
              blob;
            }
            videoRef.current!.play();
          },
          "image/jpeg",
          0.7,
        );
      }
    }, 3000); // 3초 간격으로 캡처

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <video ref={videoRef} width="640" height="480" autoPlay muted playsInline></video>
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        지원되지않는 기기입니다.
      </canvas>
    </div>
  );
};

export default VideoCapture;
