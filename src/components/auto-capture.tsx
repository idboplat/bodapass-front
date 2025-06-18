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
      await faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models/face_landmark_68_tiny");
      // await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      // await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);      setModelsLoaded(true);
      setModelsLoaded(true);
      console.log("face-api 모델 로드 완료");
    };

    loadModels();
  }, []);

  useEffect(() => {
    if (modelsLoaded && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          // width: { ideal: 320 },
          // height: { ideal: 240 },
        })
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

    let frameCount = 0;
    let isCapturing = false;

    const detectLoop = async () => {
      requestAnimationFrame(detectLoop);
      if (!videoRef.current || !canvasRef.current) return;

      // 매 10프레임마다 한 번만 실행 (skip 9 프레임)
      if (frameCount++ % 10 !== 0 || isCapturing) return;

      const detection = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.5 }),
        )
        .withFaceLandmarks(true);
      // .withFaceDescriptors();

      if (detection) {
        const landmarks = detection.landmarks;
        const positions = landmarks.positions;

        // 1. 모든 랜드마크가 잘 감지됐는지
        const allVisible = positions.length === 68;

        // 2. 눈 좌우 위치를 비교해서 정면 여부 판단
        const leftEye = landmarks.getLeftEye(); // 6개 좌표
        const rightEye = landmarks.getRightEye(); // 6개 좌표
        const nose = landmarks.getNose(); // 9개 좌표
        const jaw = landmarks.getJawOutline();

        // 눈 중심점
        const leftX = (leftEye[0].x + leftEye[3].x) / 2;
        const rightX = (rightEye[3].x + rightEye[0].x) / 2;
        const eyeCenterX = (leftX + rightX) / 2;

        // 코 중심점
        const noseX = nose[3].x;

        // 코가 양 눈 가운데쯤에 있는지 확인
        const offset = Math.abs(noseX - eyeCenterX);

        // 10픽셀 이내면 정면이라고 가정 (튜닝 가능)
        const isFrontal = allVisible && offset < 10;

        // 1. 눈 중앙
        const eyeY = (leftEye[1].y + rightEye[1].y) / 2;
        // 2. 코 중앙
        const noseY = nose[3].y;
        // 3. 턱 중앙
        const chinY = jaw[8].y;

        // 눈~턱 거리
        const eyeToChin = chinY - eyeY;
        // 코가 어디 있는지 비율로 확인
        const noseToEyeRatio = (noseY - eyeY) / eyeToChin;

        // pitch 기준 판단
        let headDirection;
        console.log("noseToEyeRatio", noseToEyeRatio);

        if (noseToEyeRatio < 0.18) {
          headDirection = "upper"; // pitch < 0
        } else if (noseToEyeRatio > 0.38) {
          headDirection = "lower"; // pitch > 0
        } else {
          headDirection = "front";
        }

        console.log("isFrontal", isFrontal);
        console.log("headDirection", headDirection);

        if (isFrontal && headDirection === "front") {
          isCapturing = true;

          const displaySize = {
            width: videoRef.current.videoWidth,
            height: videoRef.current.videoHeight,
          };

          faceapi.matchDimensions(canvasRef.current, displaySize);
          const resized = faceapi.resizeResults(detection, displaySize);
          faceapi.draw.drawDetections(canvasRef.current, resized);

          // 캡처
          videoRef.current.pause();
          canvasRef.current.toBlob(
            (blob) => {
              if (blob) {
                onFaceDetected(blob);
              }
              videoRef.current!.play();
              isCapturing = false;
            },
            "image/jpeg",
            0.7,
          );
        } else {
          canvasRef.current.getContext("2d")?.clearRect(0, 0, 640, 480); //clear canvas
        }
      } else {
        canvasRef.current.getContext("2d")?.clearRect(0, 0, 640, 480); //clear canvas
      }
    };

    detectLoop(); // 루프 시작

    return () => {
      isCapturing = false;
    };
  }, [modelsLoaded, onFaceDetected]);

  return (
    <div>
      <video ref={videoRef} width="640" height="480" autoPlay muted></video>
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
}
