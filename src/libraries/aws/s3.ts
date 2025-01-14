import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { extname } from "node:path";

export const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadToS3 = async (buffer: Buffer, fileName: string, fileType: string) => {
  const ext = extname(fileName);

  if (!ext) {
    throw new Error("파일 확장자가 없습니다.");
  }

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME, // S3 버킷 이름
    Key: fileName, // 업로드될 파일의 이름: 파일 경로를 다르게 할때는 폴더/파일명+확장자 ex) posts/thumbnail.jpg
    Body: buffer, // 업로드할 파일
    // ACL: 'public-read', // 파일 접근 권한
    ContentType: fileType, // 파일 타입
  });

  await s3Client.send(command);

  return fileName;
};

export const generatePresignedUrl = async (fileName: string) => {
  const ext = extname(fileName);

  if (!ext) {
    throw new Error("파일 확장자가 없습니다.");
  }

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
  });

  return getSignedUrl(s3Client, command, { expiresIn: 3600 });
};
