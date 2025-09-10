import { tmsApi } from "@/libraries/call-tms";
import { serverErrorHandler } from "@/libraries/error";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) => {
  try {
    const json = await request.json();

    const hash = request.headers.get("x-content-hash");
    const sesId = request.headers.get("X-TMS-SES-ID");

    const pathname = "api/call_tms_svc";
    const url = `${process.env.NEXT_PUBLIC_WAS_HTTP_URL}/${pathname}`;

    console.log("[PROXY]", url);

    const response = await tmsApi
      .post(pathname, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "X-Content-Hash": hash || "",
          "X-TMS-SES-ID": sesId || "",
        },
        cache: "no-cache",
        json,
      })
      .json();

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
};
