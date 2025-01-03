import { RekognitionClient, CompareFacesCommand, Rekognition } from "@aws-sdk/client-rekognition";

// 이미지 비교를 위한 인스턴스
export const rekognitionClient = new RekognitionClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

// collection 관리 위한 인스턴스
export const rekognition = new Rekognition({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});
