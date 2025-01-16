import { rekognition } from "@/libraries/aws/rekognition";
import { assumeStartFaceLivenessSessionRole } from "@/libraries/aws/sts";
import { InternalServerError, serverErrorHandler } from "@/libraries/error";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const output = await rekognition.createFaceLivenessSession({
      Settings: {
        AuditImagesLimit: 1, // 1개의 얼굴만 감지
        // OutputConfig: {
        //   S3Bucket: "logan-liveness-dev",
        // },
      },
    });

    if (!output.SessionId) {
      throw new InternalServerError("세션 생성 실패");
    }

    const credentials = await assumeStartFaceLivenessSessionRole(output.SessionId);
    return NextResponse.json(
      { data: output, credentials, message: "세션 생성 완료" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}
