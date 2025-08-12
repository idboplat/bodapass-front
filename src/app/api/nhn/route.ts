import { COMPARE_IMAGE_URL, NHN_API_URL } from "@/constants";
import { TNHNMatchReturn } from "@/types/api/nhn";
import ky from "ky";
import { NextRequest, NextResponse } from "next/server";

// 그룹 목록조회
export async function GET(req: NextRequest) {
  // url 파라매터로 페이지네이션
  // limit 1~200
  // next-token 다음 페이지 토큰
  const res = await ky
    .post<{
      header: {
        resultCode: number;
        resultMessage: string;
        isSuccessful: boolean;
      };
      data: {
        groupCount: number;
        groups: {
          groupId: string;
        }[];
        nextToken: string;
      };
    }>(`${NHN_API_URL}/v2.0/appkeys/${process.env.NHN_APP_KEY}/groups`, {
      headers: {
        Authorization: process.env.NHN_SECRET_KEY,
        // "x-nhn-apikey": process.env.NHN_API_KEY, // 안티 스푸핑
      },
    })
    .json();

  return NextResponse.json(res);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const image = formData.get("image") as File | null;

  if (!image) {
    return NextResponse.json({ error: "이미지를 확인해주세요" }, { status: 400 });
  }

  const savedImage = await ky.get(COMPARE_IMAGE_URL).blob();

  const formData2 = new FormData();
  formData2.append("sourceImageFile", image);
  formData2.append("targetImageFile", savedImage);
  formData2.append("threshold", "90");
  formData2.append("spoofing", "true");
  formData2.append("spoofingCondition", "balanced");

  const res = await ky
    .post<TNHNMatchReturn>(`${NHN_API_URL}/v2.0/appkeys/${process.env.NHN_APP_KEY}/faces/compare`, {
      headers: {
        Authorization: process.env.NHN_SECRET_KEY,
        // "x-nhn-apikey": process.env.NHN_API_KEY, // 안티 스푸핑
      },
      body: formData2,
    })
    .json();

  return NextResponse.json(res);
}
