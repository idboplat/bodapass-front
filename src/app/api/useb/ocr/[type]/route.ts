import ky from "ky";
import { NextRequest, NextResponse } from "next/server";

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

  const res = await ky.post<{
    success: boolean;
    message: string;
    error_code?: string;
    extra_message?: string;
    extra_code?: string;
    data: {
      idType: string;
      juminNo1: string;
      juMinNo2: string;
      _juMinNo2: string;
      issueDate: string;
      id_real?: boolean; // 사본 판별결과
      id_confidence?: string; // 정확도 0.5이상일시 실물
    };
    transaction_id: string;
  }>(`https://api3.useb.co.kr/ocr/${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.USEB_TOKEN}`,
    },
    json: {
      // mask_mode: true, // 마스크 모드 사용 여부
      // image_base64: image,
      // secret_modeoptional 암호화모드 on/off
      // ssa_modeoptional 사본판별
      image, // File type
    },
  });

  return NextResponse.json(res);
}
