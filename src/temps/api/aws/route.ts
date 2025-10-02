import { COMPARE_IMAGE_URL } from "@/constants";
import { rekognitionClient } from "@/libraries/aws/rekognition";
import { CompareFacesCommand } from "@aws-sdk/client-rekognition";
import fs from "fs/promises";
import ky from "ky";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

// 1대 1비교
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File;
    if (!image) {
      return NextResponse.json({ error: "image is required" }, { status: 400 });
    }

    const [imageA, imageB] = await Promise.all([
      image.arrayBuffer().then((buffer) => new Uint8Array(buffer)),
      ky
        .get(COMPARE_IMAGE_URL)
        .blob()
        .then((blob) => blob.arrayBuffer().then((buffer) => new Uint8Array(buffer))),
    ]);

    // // 이미지 파일을 비동기적으로 읽어 바이너리 데이터로 변환
    // const [sourceImageBytes, targetImageBytes] = await Promise.all([
    //   fs.readFile(sourceImagePath),
    //   fs.readFile(targetImagePath),
    // ]);

    // const sourceArrayBuffer = new Uint8Array(sourceImageBytes);
    // const targetArrayBuffer = new Uint8Array(targetImageBytes);

    // const sourceBase64 = sourceImageBytes.toString("base64");
    // const targetBase64 = targetImageBytes.toString("base64");

    //buffer
    const command = new CompareFacesCommand({
      SourceImage: {
        Bytes: imageA,
      },
      TargetImage: {
        Bytes: imageB,
      },
      SimilarityThreshold: 85, // 유사도 임계값 설정
    });

    const response = await rekognitionClient.send(command);

    // 첫 번째 매치의 유사도 반환, 한 사진에는 여러개의 얼굴이 있을 수 있다.
    return NextResponse.json({
      message: "success",
      data: response,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
