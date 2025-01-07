import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const CLOVA_END_POINT =
  "https://lrrlefv18g.apigw.ntruss.com/custom/v1/37307/4728863854c84533b46cf1a4ca5c0fe3e2d5815299eed8810564227591ac2c13";

const PASSPORT_END_POINT = "/document/passport";
const IDENTITICATION_END_POINT = "/document/id-card";

export async function GET(req: NextRequest) {
  try {
    const imagesDir = path.join(process.cwd(), "public");
    const sourceImagePath = path.join(imagesDir, "id_card.jpg");

    const [sourceImageBytes] = await Promise.all([fs.readFile(sourceImagePath)]);
    // const sourceArrayBuffer = new Uint8Array(sourceImageBytes);
    const sourceBase64 = sourceImageBytes.toString("base64");

    const response = await fetch(CLOVA_END_POINT + IDENTITICATION_END_POINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-OCR-SECRET": process.env.CLOVA_SECRET,
      },
      body: JSON.stringify({
        version: "V2",
        requestId: "test-id",
        timestamp: Date.now(),
        images: [
          {
            format: "png",
            name: "idcard_test",
            data: sourceBase64,
          },
        ],
      }),
    });

    const body = await response.json();

    return NextResponse.json({ data: body });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// export async function POST(req: NextRequest) {
//   return NextResponse.json({ message: "Hello, Clova!" });
// }
