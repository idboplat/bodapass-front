import { NextRequest, NextResponse } from "next/server";
import { rekognition } from "@/libraries/aws/rekognition";
import { BadRequestError, serverErrorHandler } from "@/libraries/error";

export async function POST(req: NextRequest, props: { params: Promise<{ collectionId: string }> }) {
  try {
    const formdata = await req.formData();
    const collectionId = (await props.params).collectionId;
    const image = formdata.get("image") as File | null;

    if (!image) {
      throw new BadRequestError("이미지를 찾을 수 없습니다.");
    }

    const sourceImageBytes = await image.arrayBuffer();
    const Bytes = new Uint8Array(sourceImageBytes); // Uint8Array<ArrayBufferLike>

    const searchRes = await rekognition.searchFacesByImage({
      CollectionId: collectionId,
      FaceMatchThreshold: 85,
      Image: { Bytes },
    });

    console.log("searchRes", searchRes);

    return NextResponse.json({ message: "이미지 검색 완료", data: searchRes });
  } catch (error) {
    console.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}
