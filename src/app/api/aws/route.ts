import type { NextApiRequest, NextApiResponse } from "next";
import { RekognitionClient, CompareFacesCommand, Rekognition } from "@aws-sdk/client-rekognition";
import formidable from "formidable";
import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { rekognitionClient } from "@/libraries/aws/rekognition";

// Formidable 설정: 파일 업로드를 처리하기 위해
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // 비동기 함수로 formidable을 사용하여 파일 파싱
// const parseForm = (req: NextApiRequest) => {
//   const form = new formidable.IncomingForm();
//   return new Promise<{ sourceImage: Buffer; targetImage: Buffer }>((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) return reject(err);
//       try {
//         const sourceFile = files.sourceImage as formidable.File;
//         const targetFile = files.targetImage as formidable.File;

//         if (!sourceFile || !targetFile) {
//           return reject(new Error("이미지 파일이 필요합니다."));
//         }

//         const sourceBuffer = fs.readFileSync(sourceFile.filepath);
//         const targetBuffer = fs.readFileSync(targetFile.filepath);

//         resolve({ sourceImage: sourceBuffer, targetImage: targetBuffer });
//       } catch (error) {
//         reject(error);
//       }
//     });
//   });
// };

// const createCollection = async () => {
//   const collectionId = process.env.REKOGNITION_COLLECTION_ID;

//   if (!collectionId) {
//     console.error("REKOGNITION_COLLECTION_ID이 정의되지 않았습니다.");
//     process.exit(1);
//   }

//   try {
//     const response = await rekognition.createCollection({ CollectionId: collectionId });
//     console.log(`컬렉션 ARN: ${response.CollectionArn}`);
//     console.log(`상태 코드: ${response.StatusCode}`);
//   } catch (error: any) {
//     if (error.code === "ResourceAlreadyExistsException") {
//       console.log(`컬렉션 ${collectionId}은(는) 이미 존재합니다.`);
//     } else {
//       console.error("컬렉션 생성 중 오류:", error);
//     }
//   }
// };

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
