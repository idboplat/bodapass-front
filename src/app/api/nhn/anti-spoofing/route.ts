import { serverErrorHandler } from "@/libraries/error";
import { TNHNAntiSpoofingReturn } from "@/types/api/nhn";
import ky from "ky";
import { NextRequest, NextResponse } from "next/server";

// 안티스푸핑 체크
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File | null;

    if (!image) {
      return NextResponse.json({ error: "이미지 업로드 확인" }, { status: 400 });
    }

    const imageBuffer = await image.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");

    console.log("NHN_APP_KEY", process.env.NHN_APP_KEY);
    console.log("NHN_API_KEY", process.env.NHN_API_KEY);
    console.log("NHN_SECRET_KEY", process.env.NHN_SECRET_KEY);

    const res = await ky
      .post<TNHNAntiSpoofingReturn>(
        `
    https://face-recognition-plus.api.nhncloudservice.com/v2.0/appkeys/${process.env.NHN_APP_KEY}/spoofing/faces
    `,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.NHN_SECRET_KEY,
            "x-nhn-apikey": process.env.NHN_API_KEY,
          },
          json: {
            image: {
              // 반드시 아래 둘중 하나만
              // url: "https://",
              bytes: base64Image,
            },
            aligned: false, //정렬여부 정렬 true면 얼굴 하나만 인식하는듯
            spoofingCondition: "balanced", // balanced, strict, weak
          },
        },
      )
      .json()
      .catch((error) => {
        console.log("LOG!!!!", error.message);
        console.log("LOG!!!!", error.response.body);
      });

    return NextResponse.json(res);
  } catch (error) {
    console.log("/api/nhn/anti-spoofing", error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

// curl -X POST 'https://face-recognition-plus.api.nhncloudservice.com/v2.0/appkeys/3qGSjfaTkJWgGfJc/groups' -H 'Authorization: 1uGxDtT9VzCMwNtE4N08CqfdBA5WzmQT' -H 'x-nhn-apikey: 56815ece-078e-469d-a35f-1f7036a2e32e' -H 'Content-Type: application/json;charset=UTF-8'
