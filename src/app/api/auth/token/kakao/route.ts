import {KAKAO_REDIRECT_URI} from '@/constants';
import ky from 'ky';
import { NextRequest, NextResponse } from 'next/server';

type TTokenPayload = {
  iss: string,
  aud: string,
  sub: string,
  iat: number,
  exp: number,
  nickname: string,
  picture: string,
  email: string,
  auth_time: number
}

// https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-token
export async function POST(request: NextRequest) {
  const code = request.headers.get("X-CODE");

  if (!code) {
    console.log("No code provided");
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const queryString = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
    redirect_uri: KAKAO_REDIRECT_URI,
    client_secret: process.env.KAKAO_CLIENT_SECRET,
    code
  });
  
  // https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-token
  const tokenJson = await ky.post<{
    access_token: string,
    token_type: string,
    refresh_token: string,
    id_token: string,
    expires_in: number,
    scope: string,
    refresh_token_expires_in: number
  }>("https://kauth.kakao.com/oauth/token", {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: queryString.toString(),
  }).json()

  const tokenInfoJson = await ky.post<TTokenPayload>("https://kauth.kakao.com/oauth/tokeninfo", {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({id_token: tokenJson.id_token}).toString(),
  }).json()

  console.log("id_token_info", tokenInfoJson);

  const session: Session = {
    id: tokenInfoJson.sub.toString(),
    email: tokenInfoJson.email,
    /** 로그인 종류 */
    provider: "kakao",
    sessionId: "1234567890",
    sessionKey: "1234567890",
    /** 로그인한 ISO-시간 */
    loginAt: new Date().toISOString(),
    iss: new Date().toISOString(),
  };

  return NextResponse.json({ session });
}