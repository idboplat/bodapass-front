import { NextRequest, NextResponse } from "next/server";
import { rekognition } from "@/libraries/aws/rekognition";
import { BadRequestError, serverErrorHandler } from "@/libraries/error";
import { logger } from "@/libraries/logger/pino";
import { uploadToS3 } from "@/libraries/aws/s3";
import { ResourceNotFoundException } from "@aws-sdk/client-rekognition";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ collectionId: string; faceId: string }> },
) {
  try {
    const collecitonId = (await props.params).collectionId;
    const faceId = (await props.params).faceId;

    const response = await rekognition.searchFaces({
      CollectionId: collecitonId,
      FaceId: faceId,
    });

    return NextResponse.json({ message: "얼굴 조회", data: response });
  } catch (error) {
    logger.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

export async function POST(
  req: NextRequest,
  props: { params: Promise<{ collectionId: string; faceId: string }> },
) {
  try {
    const formdata = await req.formData();
    const collectionId = (await props.params).collectionId;
    const faceId = (await props.params).faceId;
    const image = formdata.get("image") as File | null;

    if (!image) {
      throw new BadRequestError("이미지를 찾을 수 없습니다.");
    }

    const sourceImageBytes = await image.arrayBuffer();
    const Bytes = new Uint8Array(sourceImageBytes); // Uint8Array<ArrayBufferLike>
    const buffer = Buffer.from(sourceImageBytes);

    const response = await rekognition.indexFaces({
      CollectionId: collectionId,
      // DetectionAttributes: ["ALL"],
      ExternalImageId: faceId,
      Image: { Bytes },
    });

    // console.log("name", image.name); => blob
    const fileName = faceId + ".png";
    const fileType = image?.type || "image/png";
    const key = await uploadToS3(buffer, fileName, fileType);

    return NextResponse.json({ message: "얼굴 생성 완료", data: key, response }, { status: 201 });
  } catch (error) {
    logger.error(error);

    if (error instanceof ResourceNotFoundException) {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }

    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

// 업데이트는 삭제후에 새로 만드는 방법으로 구현

export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ collectionId: string; faceId: string }> },
) {
  try {
    // 단건삭제
    const collectionId = (await props.params).collectionId;
    const faceId = (await props.params).faceId;

    const response = await rekognition.deleteFaces({
      CollectionId: collectionId,
      FaceIds: [faceId],
    });

    return NextResponse.json({ message: "얼굴 삭제 완료", data: response });
  } catch (error) {
    logger.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}
