import { RekognitionClient, CompareFacesCommand, Rekognition } from "@aws-sdk/client-rekognition";
import { AWS_REGION, RECOGNITION_REGION } from "./config";

// 이미지 비교를 위한 인스턴스
export const rekognitionClient = new RekognitionClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

// collection 관리 위한 인스턴스
export const rekognition = new Rekognition({
  region: RECOGNITION_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET,
  },
});
