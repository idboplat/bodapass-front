import { rekognition } from "@/libraries/aws/rekognition";
import { serverErrorHandler } from "@/libraries/error";
import { logger } from "@/libraries/logger/pino";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function DELETE(req: NextRequest, props: { params: { collectionId: string } }) {
  try {
    // 여러개의 이미지 삭제 가능
    const body = await req.json();
    const collectionId = props.params.collectionId;
    const faceIds = z.array(z.string()).parse(body.faceIds);

    const response = await rekognition.deleteFaces({
      CollectionId: collectionId,
      FaceIds: faceIds,
    });

    return NextResponse.json({ message: "삭제 완료", data: response });
  } catch (error) {
    logger.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}
