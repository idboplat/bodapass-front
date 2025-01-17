import { rekognitionClient } from "@/libraries/aws/rekognition";
import { CompareFacesCommand } from "@aws-sdk/client-rekognition";
import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

// 1대 1비교
export async function POST(req: NextRequest) {
  try {
    const imagesDir = path.join(process.cwd(), "public");
    const sourceImagePath = path.join(imagesDir, "andy_portrait_2.jpg");
    const targetImagePath = path.join(imagesDir, "andy_portrait_resized.jpg");

    // 파일이 존재하는지 확인
    await Promise.all([fs.access(sourceImagePath), fs.access(targetImagePath)]).catch(() => {
      return NextResponse.json({ error: "can not access files" }, { status: 403 });
    });

    // 이미지 파일을 비동기적으로 읽어 바이너리 데이터로 변환
    const [sourceImageBytes, targetImageBytes] = await Promise.all([
      fs.readFile(sourceImagePath),
      fs.readFile(targetImagePath),
    ]);

    const sourceArrayBuffer = new Uint8Array(sourceImageBytes);
    const targetArrayBuffer = new Uint8Array(targetImageBytes);

    const sourceBase64 = sourceImageBytes.toString("base64");
    const targetBase64 = targetImageBytes.toString("base64");

    //buffer
    const command = new CompareFacesCommand({
      SourceImage: {
        Bytes: sourceArrayBuffer,
      },
      TargetImage: {
        Bytes: targetArrayBuffer,
      },
      SimilarityThreshold: 80, // 유사도 임계값 설정
    });

    const response = await rekognitionClient.send(command);
    const firstMatchSimilarity = response.FaceMatches?.[0].Similarity;

    // 첫 번째 매치의 유사도 반환, 한 사진에는 여러개의 얼굴이 있을 수 있다.
    if (firstMatchSimilarity) {
      return NextResponse.json({
        similarity: parseFloat(firstMatchSimilarity.toFixed(2)),
        response,
      });
    } else {
      return NextResponse.json({ similarity: 0 });
    }
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
