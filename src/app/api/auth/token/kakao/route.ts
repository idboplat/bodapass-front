import { KAKAO_REDIRECT_URI } from "@/constants";
import { signService } from "@/libraries/auth/auth.service";
import { BadRequestError, serverErrorHandler } from "@/libraries/error";
import ky from "ky";
import { NextRequest, NextResponse } from "next/server";

type TTokenPayload = {
  iss: string;
  aud: string;
  sub: string;
  iat: number;
  exp: number;
  nickname: string;
  picture: string;
  email: string;
  auth_time: number;
};

// https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-token
export async function POST(request: NextRequest) {
  try {
    const code = request.headers.get("X-CODE");

    if (!code) {
      console.log("No code provided");
      throw new BadRequestError("No code provided");
    }

    const queryString = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
      redirect_uri: KAKAO_REDIRECT_URI,
      client_secret: process.env.KAKAO_CLIENT_SECRET,
      code,
    });

    // https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-token
    const tokenJson = await ky
      .post<{
        access_token: string;
        token_type: string;
        refresh_token: string;
        id_token: string;
        expires_in: number;
        scope: string;
        refresh_token_expires_in: number;
      }>("https://kauth.kakao.com/oauth/token", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: queryString.toString(),
      })
      .json();

    const tokenInfoJson = await ky
      .post<TTokenPayload>("https://kauth.kakao.com/oauth/tokeninfo", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ id_token: tokenJson.id_token }).toString(),
      })
      .json();

    const signinData = await signService(tokenInfoJson.email, tokenInfoJson.sub, "2");

    const session: JWT = {
      ...signinData,
      /** 로그인한 ISO-시간 */
      loginAt: new Date().toISOString(),
      iss: new Date().toISOString(),
    };

    return NextResponse.json({ session });
  } catch (error) {
    console.error(error);
    const { status, message } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

export const dynamic = "force-dynamic";
