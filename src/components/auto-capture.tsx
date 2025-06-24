// components/VideoCapture.tsx
import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import css from "./auto-capture.module.scss";
import { isMobile } from "react-device-detect";

interface AutoCaptureProps {
  onFaceDetected: (args: { image: Blob; score: number }) => void;
  setMessage: (message: string) => void;
}

export default function AutoCapture({ onFaceDetected, setMessage }: AutoCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

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
    if (!modelsLoaded) return;

    let stream: MediaStream | undefined = undefined;

    const getStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      return stream;
    };

    getStream().then((s) => {
      stream = s;
    });

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [modelsLoaded]);

  useEffect(() => {
    if (!modelsLoaded) return;

    let isCapturing = false;
    let rfAnimationFrame: number;
    let timer = performance.now();
    let timerInterval = 200; // 0.2초

    try {
      const detectLoop = async () => {
        rfAnimationFrame = requestAnimationFrame(detectLoop);

        if (!videoRef.current || !canvasRef.current) return;

        const now = performance.now();
        if (now - timer < timerInterval || isCapturing) return;

        timer = now;

        const result = await faceapi
          .detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions({
              scoreThreshold: 0.9,
            }),
          )
          .withFaceLandmarks(true);
        // .withFaceDescriptors();

        if (result && result.detection.score > 0.85) {
          videoRef.current.pause();
          isCapturing = true;

          const landmarks = result.landmarks;
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
            setMessage("고개를 내려주세요");
            isCapturing = false;
            videoRef.current.play();
            return;
          } else if (noseToEyeRatio > 0.37) {
            setMessage("고개를 올려주세요");
            isCapturing = false;
            videoRef.current.play();
            return;
          }

          if (!isFrontal) {
            setMessage("정면을 보세요");
            isCapturing = false;
            videoRef.current.play();
            return;
          }

          const displaySize = {
            width: videoRef.current.videoWidth,
            height: videoRef.current.videoHeight,
          };

          faceapi.matchDimensions(canvasRef.current, displaySize);
          const resized = faceapi.resizeResults(result, displaySize);
          faceapi.draw.drawDetections(canvasRef.current, resized); // 프레임 그리기

          // 캡처
          const captureCanvas = document.createElement("canvas");
          const padding = 75;
          const scale = 1;

          captureCanvas.width = (resized.detection.box.width + padding * 2) * scale;
          captureCanvas.height = (resized.detection.box.height + padding * 2) * scale;
          const x = resized.detection.box.x - padding;
          const y = resized.detection.box.y - padding;

          captureCanvas
            .getContext("2d")
            ?.drawImage(
              videoRef.current,
              x,
              y,
              captureCanvas.width / scale,
              captureCanvas.height / scale,
              0,
              0,
              captureCanvas.width,
              captureCanvas.height,
            );

          // 선명도 체크
          // const imageData = captureCanvas
          //   .getContext("2d")!
          //   .getImageData(0, 0, captureCanvas.width, captureCanvas.height);
          // const gray = new Uint8ClampedArray(captureCanvas.width * captureCanvas.height);

          // for (let i = 0; i < gray.length; i++) {
          //   const r = imageData?.data[i * 4];
          //   const g = imageData.data[i * 4 + 1];
          //   const b = imageData.data[i * 4 + 2];
          //   // RGB → Grayscale 변환
          //   gray[i] = 0.2989 * r + 0.587 * g + 0.114 * b;
          // }

          // let sum = 0;
          // let count = 0;

          // for (let y = 1; y < captureCanvas.height - 1; y++) {
          //   for (let x = 1; x < captureCanvas.width - 1; x++) {
          //     const idx = y * captureCanvas.width + x;
          //     const dx = gray[idx + 1] - gray[idx - 1];
          //     const dy = gray[idx + captureCanvas.width] - gray[idx - captureCanvas.width];
          //     const magnitude = Math.sqrt(dx * dx + dy * dy);

          //     sum += magnitude;
          //     count++;
          //   }
          // }

          // const sharpness = sum / count;

          // console.log("sharpness", sharpness);

          // if (sharpness < 2) {
          //   setMessage("선명도가 낮습니다.");
          //   isCapturing = false;
          //   videoRef.current.play();
          //   return;
          // }

          captureCanvas.getContext("2d")!.font = "20px Arial";
          captureCanvas.getContext("2d")!.fillStyle = "red";
          captureCanvas.getContext("2d")!.fillText(result.detection.score.toFixed(2), 0, 32);

          captureCanvas.toBlob(
            (blob) => {
              if (blob) {
                onFaceDetected({ image: blob, score: result.detection.score });
              }

              // 메모리 정리
              captureCanvas
                .getContext("2d")
                ?.clearRect(0, 0, captureCanvas.width, captureCanvas.height);
              captureCanvas.width = 0;
              captureCanvas.height = 0;
              captureCanvas.remove();

              setMessage("");
              videoRef.current?.play();
              isCapturing = false;
            },
            "image/png",
            1.0,
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
      videoRef.current?.play();

      if (rfAnimationFrame) {
        cancelAnimationFrame(rfAnimationFrame);
      }
    };
  }, [modelsLoaded, onFaceDetected]);

  return (
    <div className={css.capture}>
      <video className={css.video} ref={videoRef} autoPlay muted playsInline />
      <canvas className={css.canvas} ref={canvasRef} />
      <div className={css.mask}>
        <div className={css.ring} />
      </div>
    </div>
  );
}
