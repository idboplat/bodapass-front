import { NextRequest, NextResponse } from "next/server";
import { rekognition } from "@/libraries/aws/rekognition";
import { BadRequestError, serverErrorHandler } from "@/libraries/error";
import { logger } from "@/libraries/logger/pino";

export async function POST(req: NextRequest, props: { params: { collectionId: string } }) {
  try {
    const formdata = await req.formData();
    const collectionId = props.params.collectionId;
    const image = formdata.get("image") as File | null;

    if (!image) {
      throw new BadRequestError("이미지를 찾을 수 없습니다.");
    }

    const Bytes = await image.bytes();

    const searchRes = await rekognition.searchFacesByImage({
      CollectionId: collectionId,
      FaceMatchThreshold: 85,
      Image: { Bytes },
    });

    return NextResponse.json({ message: "이미지 검색 완료", data: searchRes });
  } catch (error) {
    logger.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}
