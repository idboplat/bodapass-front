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
    }>(
      `https://face-recognition-plus.api.nhncloudservice.com/v2.0/appkeys/${process.env.NHN_APP_KEY}/groups`,
      {
        headers: {
          Authorization: process.env.NHN_SECRET_KEY,
          "x-nhn-apikey": process.env.NHN_API_KEY,
        },
      },
    )
    .json();

  return NextResponse.json(res);
}
