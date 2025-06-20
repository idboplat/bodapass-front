import ky from "ky";
import { NextRequest, NextResponse } from "next/server";

// 특정 그룹내, 모든 얼굴 목록 조회
export async function GET(req: NextRequest, { params }: { params: Promise<{ groupId: string }> }) {
  const groupId = (await params).groupId;

  const res = await ky.get<{
    header: {
      resultCode: number;
      resultMessage: string;
      isSuccessful: boolean;
    };
    data: {
      faceCount: number;
      faces: {
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
      }[];
      nextToken: string;
    };
  }>(
    `https://face-recognition-plus.api.nhncloudservice.com/v2.0/appkeys/${process.env.NHN_APP_KEY}/groups/${groupId}/faces`,
    {
      headers: {
        Authorization: process.env.NHN_SECRET_KEY,
        "x-nhn-apikey": process.env.NHN_API_KEY,
      },
    },
  );

  return NextResponse.json(res);
}

// 얼굴 등록
export async function POST(req: NextRequest, { params }: { params: Promise<{ groupId: string }> }) {
  const groupId = (await params).groupId;

  const formData = await req.formData();
  const image = formData.get("image") as File | null;
  const externalImageId = formData.get("externalImageId") as string;

  if (!image) {
    return NextResponse.json(
      {
        error: "이미지를 확인해주세요",
      },
      { status: 400 },
    );
  }

  const res = await ky.post<{
    header: {
      resultCode: number;
      resultMessage: string;
      isSuccessful: boolean;
    };
    data: {
      addedFaceCount: number;
      addedFaces: {
        imageId: string;
        externalImageId: string;
        bbox: {
          x0: number;
          y0: number;
          x1: number;
          y1: number;
        };
        confidence: number;
      }[];
      addedFaceDetails: {
        bbox: {
          x0: number;
          y0: number;
          x1: number;
          y1: number;
        };
        landmarks: {
          type: string;
          x: number;
          y: number;
        }[];
        orientation: {
          x: number;
          y: number;
          z: number;
        };
        mask: boolean;
        spoofing: boolean;
        confidence: number;
      }[];
      notAddedFaceCount: number;
      notAddedFaces: {
        bbox: {
          x0: number;
          y0: number;
          x1: number;
          y1: number;
        };
        landmarks: {
          type: string;
          x: number;
          y: number;
        }[];
        orientation: {
          x: number;
          y: number;
          z: number;
        };
        mask: boolean;
        spoofing: boolean;
        confidence: number;
      }[];
    };
  }>(
    `https://face-recognition-plus.api.nhncloudservice.com/v2.0/appkeys/${process.env.NHN_APP_KEY}/groups/${groupId}/faces`,
    {
      headers: {
        Authorization: process.env.NHN_SECRET_KEY,
        "x-nhn-apikey": process.env.NHN_API_KEY,
      },
      json: {
        image: {
          // 반드시 아래 둘중 하나만
          // url: "https://",
          bytes: image,
        },
        limit: 1, //하나만 등록
        externalImageId,
        orientation: false, // 방향감지여부
        spoofing: true, // 안티스푸핑 여부
        spoofingCondition: "balanced", // balanced, strict, weak
      },
    },
  );

  return NextResponse.json(res);
}
