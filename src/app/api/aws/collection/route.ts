import type { NextApiRequest, NextApiResponse } from "next";
import { RekognitionClient, CompareFacesCommand, Rekognition } from "@aws-sdk/client-rekognition";
import formidable from "formidable";
import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { rekognition } from "@/libraries/aws/rekognition";

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

const COLLECTION_ID = "rekognition-collection-id";

const createCollection = async () => {
  // const collectionId = process.env.REKOGNITION_COLLECTION_ID;

  try {
    const response = await rekognition.createCollection({ CollectionId: COLLECTION_ID });
    console.log(`컬렉션 ARN: ${response.CollectionArn}`);
    console.log(`상태 코드: ${response.StatusCode}`);
  } catch (error: any) {
    if (error.code === "ResourceAlreadyExistsException") {
      console.log(`컬렉션 ${COLLECTION_ID}은(는) 이미 존재합니다.`);
      throw new Error(`컬렉션 ${COLLECTION_ID}은(는) 이미 존재합니다.`);
    } else {
      console.error("컬렉션 생성 중 오류:", error);
      throw error;
    }
  }
};

export async function GET(req: NextRequest) {
  try {
    const maxResults = 100; // 한 번에 가져올 최대 얼굴 수, 최대 1000개?
    // const paginationToken = req.query.paginationToken as string | undefined;

    const faceRes = await rekognition.listFaces({
      CollectionId: COLLECTION_ID,
      MaxResults: maxResults,
      // NextToken: undefined,
    });

    const collectionRes = await rekognition.listCollections();

    // const collection = collectionRes;

    // const faces = faceRes.Faces || [];

    // rekognition.indexFaces
    const searchRes = await rekognition.searchFacesByImage({
      CollectionId: COLLECTION_ID,
      FaceMatchThreshold: 90,
      Image: {
        Bytes: new Uint8Array(
          await fs.readFile(path.join(process.cwd(), "public", "이서진_2.jpg")),
        ),
      },
    });

    return NextResponse.json({ searchRes, collectionRes, faceRes });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // await createCollection();
    // await rekognition.createUser; aws에서 사용자를 만들어서 이미지에 연결이 가능하다.
    const res = await rekognition.indexFaces({
      CollectionId: COLLECTION_ID,
      // DetectionAttributes: ["ALL"],
      ExternalImageId: "lee-seo-jin",
      Image: {
        Bytes: new Uint8Array(
          await fs.readFile(path.join(process.cwd(), "public", "이서진_1.jpg")),
        ),
      },
    });

    return NextResponse.json({ message: "컬렉션 생성 완료", res }, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// 업데이트는 삭제후에 새로 만드는 방법으로 구현

export async function DELETE(req: NextRequest) {
  try {
    // const res1 = await rekognition.deleteCollection({ CollectionId: COLLECTION_ID });
    // 얼굴 삭제시
    const res2 = await rekognition.deleteFaces({
      CollectionId: COLLECTION_ID,
      FaceIds: ["45049858-95db-4c75-bc13-2b0c2f4abd6c"],
    });

    return NextResponse.json({ message: "컬렉션 삭제 완료", res: res2 }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
