import { NextRequest, NextResponse } from "next/server";
import { TmsRequest } from "@/model/callTms";

export async function POST(request: NextRequest) {
  try {
    const bodyRes: TmsRequest & { apiLangCd: string } = await request.json();

    const hash = request.headers.get("x-content-hash");
    const sesId = request.headers.get("X-TMS-SES-ID");

    const response = await fetch(`${process.env.WAS_HTTP_URL}`, {
      method: "POST",
      body: JSON.stringify(bodyRes),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "X-Content-Hash": hash || "",
        "X-TMS-SES-ID": sesId || "",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.log("=============  TMS  Router  Error  =============");
      bodyRes.svcRqstList.map((item, index) => {
        console.log(`${index}. svcId`, item?.svcId);
      });

      console.log("===================== E N D ====================");
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    if (process.env.NEXT_PUBLIC_TMS_DEBUG === "true") {
      console.log("=============  TMS  Router  Debug  =============");
      bodyRes.svcRqstList.map((item: any, index) => {
        console.log(`${index}. svcId`, item?.svcId);
      });

      console.log("===================== E N D ====================");
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("TMS_DEBUG_ERROR", error);
    return NextResponse.json(null, { status: 500 });
  }
}
