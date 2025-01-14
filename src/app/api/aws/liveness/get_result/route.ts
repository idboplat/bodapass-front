import { rekognition } from "@/libraries/aws/rekognition";
import { BadRequestError, serverErrorHandler } from "@/libraries/error";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.nextUrl);
    const sessionId = url.searchParams.get("sessionId");

    if (!sessionId) {
      throw new BadRequestError("세션 ID가 필요합니다.");
    }

    const output = await rekognition.getFaceLivenessSessionResults({
      SessionId: sessionId,
    });

    return NextResponse.json({ data: output, message: "세션 생성 완료" }, { status: 201 });
  } catch (error) {
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}
