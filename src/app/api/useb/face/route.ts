import ky from "ky";
import { NextRequest, NextResponse } from "next/server";

// 얼굴 1대 1 매칭
export async function POST(req: NextRequest) {
  // 저장된 이미지를 불러오는 과정 필요
  const formData = await req.formData();
  const image = formData.get("image") as File | null;

  if (!image) {
    return NextResponse.json({ error: "이미지 업로드 확인" }, { status: 400 });
  }

  const imageurl = process.env.NEXT_PUBLIC_VERCEL_URL + "/cloudfront/minwook.png";

  const [compareImage, savedImage] = await Promise.all([
    image.arrayBuffer().then((buffer) => Buffer.from(buffer).toString("base64")),
    ky
      .get(imageurl)
      .blob()
      .then((blob) => blob.arrayBuffer())
      .then((buffer) => Buffer.from(buffer).toString("base64")),
  ]);

  const res = await ky
    .post<{
      success: boolean;
      message: string;
      isIdentical: boolean; //일치여부
      confidence: string; // 유사도
      transaction_id: string;
    }>("https://api3.useb.co.kr/face/match", {
      headers: {
        Authorization: `Bearer ${process.env.USEB_TOKEN}`,
      },
      json: {
        face1: compareImage,
        face2: savedImage,
      },
    })
    .json();

  return NextResponse.json(res);
}
