import { TNHNAntiSpoofingReturn } from "@/types/api/nhn";
import ky from "ky";
import { NextRequest, NextResponse } from "next/server";

// 안티스푸핑 체크
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const image = formData.get("image") as File | null;

  if (!image) {
    return NextResponse.json({ error: "이미지 업로드 확인" }, { status: 400 });
  }

  const res = await ky.post<TNHNAntiSpoofingReturn>(
    `
    https://face-recognition-plus.api.nhncloudservice.com/v2.0/appkeys/${process.env.NHN_APP_KEY}/spoofing/faces
    `,
    {
      headers: {
        Authorization: `Bearer ${process.env.NHN_SECRET_KEY}`,
        "x-nhn-apikey": process.env.NHN_APP_KEY,
      },
      json: {
        image: {
          // 반드시 아래 둘중 하나만
          // url: "https://",
          bytes: image,
        },
        aligned: true, //정렬여부 정렬 true면 얼굴 하나만 인식하는듯
        spoofingCondition: "balanced", // balanced, strict, weak
      },
    },
  );

  return NextResponse.json(res);
}
