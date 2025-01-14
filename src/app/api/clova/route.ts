import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { z } from "zod";
import { serverErrorHandler } from "@/libraries/error";
import { logger } from "@/libraries/logger/pino";
import { OCRResponseData } from "@/types/api/clova";
import { uploadToS3 } from "@/libraries/aws/s3";

const CLOVA_END_POINT =
  "https://lrrlefv18g.apigw.ntruss.com/custom/v1/37307/4728863854c84533b46cf1a4ca5c0fe3e2d5815299eed8810564227591ac2c13";

const PASSPORT_END_POINT = "/document/passport";
const IDENTITICATION_END_POINT = "/document/id-card";

const dto = z.object({});

export async function POST(req: NextRequest) {
  try {
    const formdata = await req.formData();

    const capture = formdata.get("image") as File | null;

    if (!capture) {
      throw new Error("Image not found");
    }

    const sourceImageBytes = await capture.arrayBuffer();
    const buffer = Buffer.from(sourceImageBytes);
    const sourceBase64 = buffer.toString("base64");

    const response = await fetch(CLOVA_END_POINT + IDENTITICATION_END_POINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-OCR-SECRET": process.env.CLOVA_SECRET,
      },
      body: JSON.stringify({
        version: "V2",
        requestId: "test-id",
        timestamp: Date.now(),
        images: [
          {
            format: "png",
            name: "idcard_test",
            data: sourceBase64,
          },
        ],
      }),
    });

    const body: OCRResponseData = await response.json();

    const fileName = body.requestId + path.extname(capture.name);
    const fileType = capture?.type || "image/jpeg";

    const key = await uploadToS3(buffer, fileName, fileType);
    logger.info(`Uploaded to S3: ${key}`);

    return NextResponse.json({ data: body });
  } catch (error) {
    logger.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}
