import { sessionService } from "@/libraries/auth/auth.service";
import { REFRESH_COOKIE_NAME, REFRESH_TOKEN_MAX_AGE } from "@/libraries/auth/config";
import { generateRefreshToken } from "@/libraries/auth/jwt.service";
import { serverErrorHandler } from "@/libraries/error";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.headers.get("x-full-url")!);
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(REFRESH_COOKIE_NAME);

    const headers = new Headers(req.headers);
    headers.set("cache-control", "no-store");
    headers.set("pragma", "no-cache");
    headers.set("expires", "0");

    if (!refreshToken) {
      return NextResponse.json({ session: null, message: "세션조회 성공" });
    }

    const session = await sessionService(refreshToken.value);
    const newRefreshToken = await generateRefreshToken(session);

    (await cookies()).set(REFRESH_COOKIE_NAME, newRefreshToken, {
      maxAge: REFRESH_TOKEN_MAX_AGE,
      httpOnly: true,
      secure: url.protocol === "https:",
      sameSite: "lax",
    });

    return NextResponse.json({ session, message: "세션조회 성공" }, { headers });
  } catch (error) {
    console.error("/api/auth/session", error);
    const { status, message } = serverErrorHandler(error);
    return NextResponse.json({ session: null, message: message }, { status: status });
  }
}

export const dynamic = "force-dynamic";
