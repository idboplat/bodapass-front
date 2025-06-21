import ky from "ky";
import { NextRequest, NextResponse } from "next/server";

export type TOCRReturn = {};

const API_MAP = {
  idcard: "idcard-driver",
  driver: "idcard-driver",
  passport: "passport",
  "passport-overseas": "passport-overseas",
  alien: "alien",
  "alien-back": "alien-back",
};

// type 별 OCR 처리
// https://doc.useb.co.kr/#api-OCR-OCR-%EC%A3%BC%EB%AF%BC%EB%93%B1%EB%A1%9D%EC%A6%9D
export async function POST(req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const path = API_MAP[type as keyof typeof API_MAP] as string | undefined;

  if (!path) {
    return NextResponse.json({ error: "존재하지 않는 타입" }, { status: 400 });
  }

  const formData = await req.formData();
  const image = formData.get("image") as File | null;

  if (!image) {
    return NextResponse.json({ error: "이미지 업로드 확인" }, { status: 400 });
  }

  const json = await ky
    .post<TOCRReturn>(`https://api3.useb.co.kr/ocr/${path}`, {
      headers: {
        Authorization: `Bearer ${process.env.USEB_TOKEN}`,
      },
      body: formData,
    })
    .json()
    .catch((error) => {
      console.log("error", error.response.body);
      return error.response.body;
    });

  console.log("json", json);

  return NextResponse.json(json);
}
