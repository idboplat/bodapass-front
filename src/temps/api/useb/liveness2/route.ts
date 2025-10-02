import { COMPARE_IMAGE_URL } from "@/constants";
import { TUsebFaceCompareReturn, TUsebFaceMatchReturn } from "@/temps/type/useb";
import ky from "ky";
import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import { writeFileSync } from "fs";
import { join } from "path";

// 라이브니스 체크
// https://doc.useb.co.kr/#api-%EC%95%88%EB%A9%B4%EC%9D%B8%EC%A6%9D-2.%EC%95%88%EB%A9%B4_%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%8B%88%EC%8A%A4
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const image = formData.get("image") as File | null;

  if (!image) {
    return NextResponse.json({ error: "이미지 업로드 확인" }, { status: 400 });
  }

  // const image1 = formData.get("image1") as File | null;
  // const image2 = formData.get("image2") as File | null;
  // const image3 = formData.get("image3") as File | null;
  // const image4 = formData.get("image4") as File | null;

  // if (!image1 || !image2 || !image3 || !image4) {
  //   return NextResponse.json({ error: "이미지 업로드 확인" }, { status: 400 });
  // }

  // // 4장의 이미지를 ZIP 파일로 압축
  // const zip = new JSZip();

  // // 각 이미지를 ZIP에 추가
  // await Promise.all([
  //   image1.arrayBuffer().then((buffer) => zip.file("image1.png", buffer)),
  //   image2.arrayBuffer().then((buffer) => zip.file("image2.png", buffer)),
  //   image3.arrayBuffer().then((buffer) => zip.file("image3.png", buffer)),
  //   image4.arrayBuffer().then((buffer) => zip.file("image4.png", buffer)),
  // ]);

  // ZIP 파일 생성
  // const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

  // writeFileSync("images.zip", zipBuffer);

  // const formData1 = new FormData();
  // formData1.append("zip_file", new Blob([zipBuffer], { type: "application/zip" }), "images.zip");
  // formData1.append("frame_counts", "4");
  // formData1.append("filename_extension", "png");

  // const json = await ky
  //   .post<TUsebFaceMatchReturn>("https://face.useb.co.kr/liveness/multiframe", {
  //     headers: {
  //       Authorization: `Bearer ${process.env.USEB_LIVENESS_TOKEN}`,
  //     },
  //     body: formData1,
  //   })
  //   .json();

  // console.log("json", json);

  // if (json.is_live !== true) {
  //   // null or false
  //   return NextResponse.json(
  //     { data: { FaceMatches: [{ Face: { FaceId: json.return_msg.return_msg } }] } },
  //     { status: 200 },
  //   );
  // }

  const json = await ky
    .post<TUsebFaceMatchReturn>("https://face.useb.co.kr/liveness", {
      headers: {
        Authorization: `Bearer ${process.env.USEB_LIVENESS_TOKEN}`,
      },
      body: formData,
    })
    .json();

  console.log("json", json);

  // if (json.is_live !== true) {
  //   // null or false
  //   return NextResponse.json(
  //     { data: { FaceMatches: [{ Face: { FaceId: json.return_msg.return_msg } }] } },
  //     { status: 200 },
  //   );
  // }

  const savedImage = await ky.get(COMPARE_IMAGE_URL).blob();

  const formData2 = new FormData();
  formData2.append("image_a", image);
  formData2.append("image_b", savedImage);

  const json2 = await ky
    .post<TUsebFaceCompareReturn>("https://face.useb.co.kr/compare", {
      headers: {
        Authorization: `Bearer ${process.env.USEB_LIVENESS_TOKEN}`,
      },
      body: formData2,
    })
    .json()
    .catch((error) => {
      console.log("error", error);
      return error.response.body;
    });

  console.log("json2", json2);

  return NextResponse.json(json2);
}

// json {
//   confidence: 0,
//   is_live: null,
//   threshold_info: null,
//   return_msg: {
//     return_code: 'FAIL-0011',
//     return_msg: 'face quality for checking liveness is low.'
//   }
// }

// multiframe zip 왜 안됨?
// {
//   "confidence": 0,
//   "is_live": null,
//   "threshold_info": null,
//   "return_msg": {
//       "return_code": "ERR-4024",
//       "return_msg": "FaceSDK - Multiframe liveness: Invalid image files count"
//   }
// }
