import { NextRequest, NextResponse } from "next/server";
import ky from "ky";

// oauth 로그인 후 토큰 발급
export async function POST(req: NextRequest) {
  const email = process.env.USEB_EMAIL;
  const password = process.env.USEB_PASSWORD;

  const loginRes = await ky
    .post<{
      success: boolean;
      message: string;
      data: {
        client_id: string;
        client_secret: string;
      };
      transaction_id: string;
    }>("https://auth.useb.co.kr/oauth/get-client-secret", {
      json: {
        email,
        password,
      },
    })
    .json();

  console.log("POST /get-client-secret", loginRes);

  const clientId = loginRes.data.client_id;
  const clientSecret = loginRes.data.client_secret;

  const basicAuth = atob(`${clientId}:${clientSecret}`);

  const tokenRes = await ky
    .post<{
      success: boolean;
      message: string;
      jwt: string;
      expires_in: string;
      transaction_id: string;
    }>("https://auth.useb.co.kr/oauth/token", {
      headers: {
        Authorization: `Basic ${basicAuth}`,
      },
    })
    .json();

  console.log("POST /token", tokenRes);

  return NextResponse.json({
    token: tokenRes.jwt,
    expires_in: tokenRes.expires_in,
  });
}
