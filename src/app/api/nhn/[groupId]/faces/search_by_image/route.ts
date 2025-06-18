import { TNHNSearchReturn } from "@/types/api/nhn";
import ky from "ky";
import { NextRequest, NextResponse } from "next/server";

// 이미지로 검색
export async function POST(req: NextRequest, { params }: { params: Promise<{ groupId: string }> }) {
  const groupId = (await params).groupId;

  const formData = await req.formData();
  const image = formData.get("image") as File | null;

  if (!image) {
    return NextResponse.json(
      {
        error: "이미지를 확인해주세요",
      },
      { status: 400 },
    );
  }

  const res = await ky.post<TNHNSearchReturn>(
    `https://face-recognition-plus.api.nhncloudservice.com/v2.0/appkeys/${process.env.NHN_APP_KEY}/groups/${groupId}/faces/search`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NHN_SECRET_KEY}`,
        "x-nhn-apikey": process.env.NHN_APP_KEY,
      },
      json: {
        image: {
          bytes: image,
        },
        limit: 1,
        threshold: 85, //임계치
        orientation: true, //방향
        mask: true, //마스크 감지
        spoofing: true, //스푸핑 감지
        spoofingCondition: "balanced", // balanced, strict, weak
      },
    },
  );

  return NextResponse.json(res);
}
