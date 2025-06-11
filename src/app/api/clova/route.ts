import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { BadRequestError, serverErrorHandler } from "@/libraries/error";
import { OCRResponseData } from "@/types/api/clova";
import { uploadToS3 } from "@/libraries/aws/s3";
import { clovaRequestDto } from "@/types/dto";

const CLOVA_END_POINT =
  "https://lrrlefv18g.apigw.ntruss.com/custom/v1/37307/4728863854c84533b46cf1a4ca5c0fe3e2d5815299eed8810564227591ac2c13";

// const PASSPORT_END_POINT = "/document/passport";
const IDENTITICATION_END_POINT = "/document/id-card";

export async function POST(req: NextRequest) {
  try {
    const formdata = await req.formData();
    const dto = clovaRequestDto.safeParse({
      image: formdata.get("image"),
      type: formdata.get("type"),
      name: formdata.get("name"),
      requestId: formdata.get("requestId"),
    });

    if (dto.error) {
      throw new BadRequestError(dto.error.errors[0].message);
    }

    // const endpoint = dto.data.type === "idCard" ? IDENTITICATION_END_POINT : PASSPORT_END_POINT;

    const sourceImageBytes = await dto.data.image.arrayBuffer();
    const buffer = Buffer.from(sourceImageBytes);
    const sourceBase64 = buffer.toString("base64");

    // passport도 /id-card로 처리해야함.
    const response = await fetch(CLOVA_END_POINT + IDENTITICATION_END_POINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-OCR-SECRET": process.env.CLOVA_SECRET,
      },
      body: JSON.stringify({
        version: "V2",
        requestId: dto.data.requestId,
        timestamp: Date.now(),
        images: [
          {
            format: "png",
            name: dto.data.name,
            data: sourceBase64,
          },
        ],
      }),
    });

    const body: OCRResponseData = await response.json();
    console.log(body);

    const fileName = body.requestId + path.extname(dto.data.image.name);
    const fileType = dto.data.image?.type || "image/png";

    const key = await uploadToS3(buffer, fileName, fileType);
    console.log(`Uploaded to S3: ${key}`);

    return NextResponse.json({ data: body });
  } catch (error) {
    console.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}
