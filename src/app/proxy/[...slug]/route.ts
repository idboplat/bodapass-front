import { tmsApi } from "@/libraries/call-tms";
import { serverErrorHandler } from "@/libraries/error";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) => {
  try {
    const formData = await request.formData();
    const formData2 = new FormData();

    for (const [key, value] of formData.entries()) {
      formData2.append(key, value);
    }

    // const header = request.headers;
    // const contentType = header.get("Content-Type");

    const pathname = (await params).slug.join("/");

    const url = `${process.env.NEXT_PUBLIC_WAS_HTTP_URL}/${pathname}`;

    console.log("[PROXY]", url);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const json = await response.json();
    // .post(pathname, {
    //   body: formData2,
    // })
    // .json();

    return NextResponse.json(json);
  } catch (error) {
    console.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
};
