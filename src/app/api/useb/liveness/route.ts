import { TUsebFaceMatchReturn } from "@/types/api/useb";
import ky from "ky";
import { NextRequest, NextResponse } from "next/server";

// 라이브니스 체크
// https://doc.useb.co.kr/#api-%EC%95%88%EB%A9%B4%EC%9D%B8%EC%A6%9D-2.%EC%95%88%EB%A9%B4_%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%8B%88%EC%8A%A4
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const image = formData.get("image") as File | null;

  if (!image) {
    return NextResponse.json({ error: "이미지 업로드 확인" }, { status: 400 });
  }

  // const [face1, face2, face3, face4] = await Promise.all([
  //   image.arrayBuffer().then((buffer) => Buffer.from(buffer).toString("base64")),
  //   image2.arrayBuffer().then((buffer) => Buffer.from(buffer).toString("base64")),
  //   image3.arrayBuffer().then((buffer) => Buffer.from(buffer).toString("base64")),
  //   image4.arrayBuffer().then((buffer) => Buffer.from(buffer).toString("base64")),
  // ]);

  const res = await ky
    .post<TUsebFaceMatchReturn>("https://face.useb.co.kr/liveness", {
      headers: {
        Authorization: `Bearer ${process.env.USEB_LIVENESS_TOKEN}`,
      },
      body: formData,
    })
    .json();

  console.log("res", res);

  return NextResponse.json(res);
}
