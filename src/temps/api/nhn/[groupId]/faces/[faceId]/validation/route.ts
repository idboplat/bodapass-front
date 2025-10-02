import { NHN_API_URL } from "@/constants";
import { TNHNValidationReturn } from "@/temps/type/nhn";
import ky from "ky";
import { NextRequest, NextResponse } from "next/server";

// 얼굴 검증, 이미지를 한장 받아서 맞는지 검증
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ groupId: string; faceId: string }> },
) {
  const groupId = (await params).groupId;
  const faceId = (await params).faceId;

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

  const res = await ky.post<TNHNValidationReturn>(
    `${NHN_API_URL}/v2.0/appkeys/${process.env.NHN_APP_KEY}/groups/${groupId}/faces/${faceId}/verify`,
    {
      headers: {
        Authorization: process.env.NHN_SECRET_KEY,
        // "x-nhn-apikey": process.env.NHN_API_KEY, // 안티 스푸핑
      },
      json: {
        compareImage: {
          bytes: image,
        },
        orientation: true,
        mask: true,
        spoofing: true,
        spoofingCondition: "balanced", // balanced, strict, weak
      },
    },
  );

  return NextResponse.json(res);
}
