import { NextRequest, NextResponse } from "next/server";
import { rekognition } from "@/libraries/aws/rekognition";
import { logger } from "@/libraries/logger/pino";
import { serverErrorHandler } from "@/libraries/error";

export async function GET(req: NextRequest) {
  try {
    //TODO: paginationToken 사용
    const maxResults = 100; // 한 번에 가져올 최대 얼굴 수, 최대 1000개?
    // const paginationToken = req.query.paginationToken as string | undefined;

    const response = await rekognition.listCollections();
    console.log(response);

    return NextResponse.json({ message: "콜렉션 조회", data: response });
  } catch (error) {
    logger.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

export const dynamic = "force-dynamic";
