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

  const res = await ky.post<{
    header: {
      resultCode: number;
      resultMessage: string;
      isSuccessful: boolean;
    };
    data: {
      similarity: number;
      face: {
        bbox: {
          x0: number;
          y0: number;
          x1: number;
          y1: number;
        };
        confidence: number;
        faceId: string;
        imageId: string;
        externalImageId: string;
      };
      sourceFace: {
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
      };
    };
  }>(
    `https://face-recognition-plus.api.nhncloudservice.com/v2.0/appkeys/${process.env.NHN_APP_KEY}/groups/${groupId}/faces/${faceId}/verify`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NHN_SECRET_KEY}`,
        "x-nhn-apikey": process.env.NHN_APP_KEY,
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
