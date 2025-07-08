import ky from 'ky';
import { NextRequest, NextResponse } from 'next/server';

// https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-token
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    console.log("No code provided");
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const queryString = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
    redirect_uri: `${process.env.NEXT_PUBLIC_FRONT_URL}/api/auth/callback/kakao`,
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

  const tokenInfoJson = await ky.post<{
      iss: string,
      aud: string,
      sub: string,
      iat: number,
      exp: number,
      nickname: string,
      picture: string,
      email: string,
      auth_time: number
    }>("https://kauth.kakao.com/oauth/tokeninfo", {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({id_token: tokenJson.id_token}).toString(),
  }).json()

  console.log("id_token_info", tokenInfoJson);
  
  const redirectUrl = new URL(process.env.NEXT_PUBLIC_FRONT_URL);
  return NextResponse.json({},{ status: 301, headers: { Location: redirectUrl.toString() }});
}