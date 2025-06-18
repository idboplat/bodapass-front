// components/VideoCapture.tsx

import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

interface AutoCaptureProps {
  onFaceDetected: (image: Blob) => void;
}

export default function AutoCapture({ onFaceDetected }: AutoCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models/tiny_face_detector");
      // await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      // await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
      console.log("face-api 모델 로드 완료");
    };

    loadModels();
  }, []);

  useEffect(() => {
    if (modelsLoaded && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current!.srcObject = stream;
        })
        .catch((err) => {
          console.error("웹캠 접근 오류:", err);
        });
    }
  }, [modelsLoaded]);

  useEffect(() => {
    if (!modelsLoaded) return;

    const interval = setInterval(async () => {
      const canvas = canvasRef.current!;
      canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);

      if (videoRef.current && canvasRef.current) {
        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions(),
        );
        // .withFaceLandmarks()
        // .withFaceDescriptors();
        console.log("detections", detections);

        if (detections.length > 0) {
          const displaySize = {
            width: videoRef.current!.videoWidth,
            height: videoRef.current!.videoHeight,
          };

          //draw detections
          faceapi.matchDimensions(canvas, displaySize);
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          faceapi.draw.drawDetections(canvas, resizedDetections);

          // 프레임을 Blob으로 캡처하여 백엔드로 전송
          videoRef.current.pause();
          canvas.toBlob(
            (blob) => {
              if (blob) {
                onFaceDetected(blob);
              }
              videoRef.current!.play();
            },
            "image/jpeg",
            0.7,
          );
        }
      }
    }, 3000); // 3초 간격으로 캡처

    return () => clearInterval(interval);
  }, [modelsLoaded, onFaceDetected]);

  return (
    <div>
      <video ref={videoRef} width="640" height="480" autoPlay muted></video>
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ position: "absolute", top: 0, left: 0 }}
      ></canvas>
    </div>
  );
}
