import { KAKAO_REDIRECT_URI } from "@/constants";
import { socialSignInService, validateExternalId } from "@/libraries/auth/auth.service";
import { BadRequestError, NotFoundError, serverErrorHandler } from "@/libraries/error";
import ky from "ky";
import { NextRequest, NextResponse } from "next/server";
import dayjs from "@/libraries/dayjs";

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
      console.error("/api/auth/signin/kakao", "X-CODE가 입력되지 않았습니다.");
      throw new NotFoundError();
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
      .json()
      .catch((error) => {
        console.error("/api/auth/signin/kakao - token", error);
        throw new BadRequestError("유효하지 않은 세션입니다.");
      });

    const tokenInfoJson = await ky
      .post<TTokenPayload>("https://kauth.kakao.com/oauth/tokeninfo", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ id_token: tokenJson.id_token }).toString(),
      })
      .json()
      .catch((error) => {
        console.error("/api/auth/signin/kakao - tokeninfo", error);
        throw new BadRequestError("유효하지 않은 세션입니다.");
      });

    const result = await validateExternalId(tokenInfoJson.email);

    if (!result) {
      console.info("/api/auth/signin/kakao", "가입되지 않은 소셜 계정입니다.");

      return NextResponse.json({
        token: {
          externalId: tokenInfoJson.email,
          code: tokenInfoJson.sub,
        },
      });
    }

    const signinData = await socialSignInService(tokenInfoJson.email, tokenInfoJson.sub);

    const iso = dayjs().toISOString();

    const session: JWT = {
      ...signinData,
      /** 로그인한 ISO-시간 */
      loginAt: iso,
      iss: iso,
    };

    return NextResponse.json({ session });
  } catch (error) {
    console.error("/api/auth/token/kakao", error);
    const { status, message } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

export const dynamic = "force-dynamic";
