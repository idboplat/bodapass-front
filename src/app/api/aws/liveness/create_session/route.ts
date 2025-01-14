import { rekognition } from "@/libraries/aws/rekognition";
import { serverErrorHandler } from "@/libraries/error";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const output = await rekognition.createFaceLivenessSession({
      Settings: {
        AuditImagesLimit: 1, // 1개의 얼굴만 감지
      },
    });

    return NextResponse.json({ data: output, message: "세션 생성 완료" }, { status: 201 });
  } catch (error) {
    console.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}
