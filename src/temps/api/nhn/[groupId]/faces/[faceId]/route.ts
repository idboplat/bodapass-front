import { NHN_API_URL } from "@/constants";
import ky from "ky";
import { NextRequest, NextResponse } from "next/server";

// 얼굴 단건조회, 벡터 반환
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ groupId: string; faceId: string }> },
) {
  const groupId = (await params).groupId;
  const faceId = (await params).faceId;

  const res = await ky.get<{
    header: {
      resultCode: number;
      resultMessage: string;
      isSuccessful: boolean;
    };
    data: {
      matchFaceCount: number;
      matchFaces: {
        face: {
          faceId: string;
          imageId: string;
          externalImageId: string;
          bbox: {
            x0: number;
            y0: number;
            x1: number;
            y1: number;
          };
          confidence: number;
        };
        similarity: number;
      }[];
    };
  }>(
    `${NHN_API_URL}/v2.0/appkeys/${process.env.NHN_APP_KEY}/groups/${groupId}/faces/${faceId}/search`,
    {
      headers: {
        Authorization: process.env.NHN_SECRET_KEY,
        // "x-nhn-apikey": process.env.NHN_API_KEY, // 안티 스푸핑
      },
    },
  );

  return NextResponse.json(res);
}

// 얼굴 삭제
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ groupId: string; faceId: string }> },
) {
  const groupId = (await params).groupId;
  const faceId = (await params).faceId;

  const res = await ky.delete<{
    header: {
      resultCode: number;
      resultMessage: string;
      isSuccessful: boolean;
    };
  }>(`${NHN_API_URL}/v2.0/appkeys/${process.env.NHN_APP_KEY}/groups/${groupId}/faces/${faceId}`, {
    headers: {
      Authorization: process.env.NHN_SECRET_KEY,
      // "x-nhn-apikey": process.env.NHN_API_KEY, // 안티 스푸핑
    },
  });

  return NextResponse.json(res);
}
