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
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (modelsLoaded) return;

    const loadModels = async () => {
      if (!faceapi.nets.tinyFaceDetector.isLoaded) {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models/tiny_face_detector");
      }

      if (!faceapi.nets.faceLandmark68TinyNet.isLoaded) {
        await faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models/face_landmark_68_tiny");
      }
      // await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      // await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);      setModelsLoaded(true);
      setModelsLoaded(true);
      console.log("face-api 모델 로드 완료");
    };

    loadModels();
  }, [modelsLoaded]);

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

    let isCapturing = false;
    let rfAnimationFrame: number;
    let timer = performance.now();
    let timerTrigger = 100; // 0.1초

    try {
      const detectLoop = async () => {
        rfAnimationFrame = requestAnimationFrame(detectLoop);
        if (!videoRef.current || !canvasRef.current) return;

        const now = performance.now();
        if (now - timer < timerTrigger || isCapturing) return;

        timer = now;
        videoRef.current.play();

        const detection = await faceapi
          .detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.5 }),
          )
          .withFaceLandmarks(true);

        // .withFaceDescriptors();

        if (detection) {
          isCapturing = true;
          videoRef.current.pause();

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

          if (noseToEyeRatio < 0.18) {
            setMessage(() => "고개를 내려주세요");
            isCapturing = false;
            return;
          } else if (noseToEyeRatio > 0.37) {
            setMessage(() => "고개를 올려주세요");
            isCapturing = false;
            return;
          }

          if (!isFrontal) {
            setMessage(() => "정면을 보세요");
            isCapturing = false;
            return;
          }

          const displaySize = {
            width: videoRef.current.videoWidth,
            height: videoRef.current.videoHeight,
          };

          faceapi.matchDimensions(canvasRef.current, displaySize);
          const resized = faceapi.resizeResults(detection, displaySize);
          faceapi.draw.drawDetections(canvasRef.current, resized); // 프레임 그리기

          // 캡처
          const captureCanvas = document.createElement("canvas");
          const padding = 100;

          captureCanvas.width = resized.detection.box.width + padding * 2;
          captureCanvas.height = resized.detection.box.height + padding * 2;
          const x = resized.detection.box.x - padding;
          const y = resized.detection.box.y - padding;

          captureCanvas
            .getContext("2d")
            ?.drawImage(
              videoRef.current,
              x,
              y,
              captureCanvas.width,
              captureCanvas.height,
              0,
              0,
              captureCanvas.width,
              captureCanvas.height,
            );

          captureCanvas.getContext("2d")!.font = "28px Arial";
          captureCanvas.getContext("2d")!.fillText(Date.now().toString(), 100, 32);

          captureCanvas.toBlob(
            (blob) => {
              if (blob) {
                onFaceDetected(blob);
              }

              // 메모리 정리
              captureCanvas
                .getContext("2d")
                ?.clearRect(0, 0, captureCanvas.width, captureCanvas.height);
              captureCanvas.width = 0;
              captureCanvas.height = 0;
              captureCanvas.remove();

              setMessage(() => "");
              videoRef.current!.play();
            },
            "image/jpeg",
            0.7,
          );
        } else {
          canvasRef.current
            .getContext("2d")
            ?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      };

      detectLoop(); // 루프 시작
    } catch (error) {
      console.error("오류:", error);
    }

    return () => {
      isCapturing = false;

      if (rfAnimationFrame) {
        cancelAnimationFrame(rfAnimationFrame);
      }
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
      <p>{message}</p>
    </div>
  );
}
