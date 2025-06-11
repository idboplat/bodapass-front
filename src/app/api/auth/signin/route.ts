import { checkBasicAuth, signService } from "@/libraries/auth/auth.service";
import { REFRESH_COOKIE_NAME, REFRESH_TOKEN_MAX_AGE } from "@/libraries/auth/config";
import { generateRefreshToken } from "@/libraries/auth/jwt.service";
import { serverErrorHandler } from "@/libraries/error";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const isSecure = req.nextUrl.protocol === "https:";
    const { corpCd, externId } = checkBasicAuth(req.headers.get("authorization"));
    const signinData = await signService(corpCd, externId);

    const payload: JWT = {
      ...signinData,
      provider: "email",
      email: externId,
      loginAt: new Date().toISOString(),
      iss: new Date().toISOString(),
    };

    const newRefreshToken = await generateRefreshToken(payload);

    (await cookies()).set(REFRESH_COOKIE_NAME, newRefreshToken, {
      maxAge: REFRESH_TOKEN_MAX_AGE,
      httpOnly: true,
      secure: isSecure,
      sameSite: "lax",
    });

    return NextResponse.json({ message: "Signin success" });
  } catch (error) {
    console.error(error);
    const { status, message } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status: status });
  }
}

export const dynamic = "force-dynamic";
