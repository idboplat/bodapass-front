import { REFRESH_COOKIE_NAME } from "@/libraries/auth/config";
import { serverErrorHandler } from "@/libraries/error";
import { logger } from "@/libraries/logger/pino";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    cookies().delete(REFRESH_COOKIE_NAME);

    return NextResponse.json({ message: "Signout success" });
  } catch (e) {
    logger.error(e);
    const { status, message } = serverErrorHandler(e);
    return NextResponse.json({ message: message }, { status: status });
  }
}

export const dynamic = "force-dynamic";
