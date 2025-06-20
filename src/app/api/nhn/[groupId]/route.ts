import ky from "ky";
import { NextRequest, NextResponse } from "next/server";

// 그룹아이디는 영문숫자만 가능

// 그룹 단건조회, 얼굴등록 갯수반환
export async function GET(req: NextRequest, { params }: { params: Promise<{ groupId: string }> }) {
  const groupId = (await params).groupId;

  const res = await ky.get<{
    header: {
      resultCode: number;
      resultMessage: string;
      isSuccessful: boolean;
    };
    data: {
      groupId: string;
      createTime: string;
      faceCount: number;
    };
  }>(
    `https://face-recognition-plus.api.nhncloudservice.com/v2.0/appkeys/${process.env.NHN_APP_KEY}/groups/${groupId}`,
    {
      headers: {
        Authorization: process.env.NHN_SECRET_KEY,
        "x-nhn-apikey": process.env.NHN_API_KEY,
      },
    },
  );

  return NextResponse.json(res);
}

// 그룹 생성
export async function POST(req: NextRequest, { params }: { params: Promise<{ groupId: string }> }) {
  const groupId = (await params).groupId;

  const res = await ky.post<{
    header: {
      resultCode: number;
      resultMessage: string;
      isSuccessful: boolean;
    };
  }>(
    `https://face-recognition-plus.api.nhncloudservice.com/v2.0/appkeys/${process.env.NHN_APP_KEY}/groups`,
    {
      headers: {
        Authorization: process.env.NHN_SECRET_KEY,
        "x-nhn-apikey": process.env.NHN_API_KEY,
      },
      json: {
        groupId,
      },
    },
  );

  return NextResponse.json(res);
}

// 그룹 삭제
// 그룹내 얼굴도 모두 삭제됨
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ groupId: string }> },
) {
  const groupId = (await params).groupId;

  const res = await ky.delete<{
    header: {
      resultCode: number;
      resultMessage: string;
      isSuccessful: boolean;
    };
  }>(
    `https://face-recognition-plus.api.nhncloudservice.com/v2.0/appkeys/${process.env.NHN_APP_KEY}/groups/${groupId}`,
  );

  return NextResponse.json(res);
}
