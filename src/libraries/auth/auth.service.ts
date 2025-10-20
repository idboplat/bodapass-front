import "server-only";
import { callTms, StringRspnData } from "@/libraries/call-tms";
import { InternalServerError } from "../error";
import { parseJwtToken } from "./jwt.service";
import { cookies } from "next/headers";
import { REFRESH_COOKIE_NAME } from "./config";
import { redirect } from "next/navigation";

export const checkBasicAuth = (auth: string | null) => {
  if (auth === null) {
    throw new InternalServerError("Invalid authorization");
  }
  try {
    const credentials = auth.split("Basic ")[1];
    const [corpCd, externId] = atob(credentials).split(":");
    return { corpCd, externId };
  } catch (e) {
    throw new InternalServerError("Invalid authorization");
  }
};

export const checkBearerAuth = (auth: string | null) => {
  if (auth === null) {
    throw new InternalServerError("Invalid authorization");
  }

  try {
    const token = auth.split("Bearer ")[1];
    const payload = parseJwtToken(token, "access");
    return payload;
  } catch (e) {
    throw new InternalServerError("Invalid authorization");
  }
};

export const validateExternalId = async (externalId: string) => {
  const res = await callTms<StringRspnData<1>>({
    svcId: "TCM200000SSQ01",
    session: null,
    data: [externalId],
    locale: "ko",
  });

  if (res.svcRspnData === null) {
    throw new InternalServerError("validation is failed");
  }

  return res.svcRspnData[0].F01 === "Y";
};

export const emailSignInService = async (externalId: string, password: string) => {
  const res = await callTms<StringRspnData<9>>({
    svcId: "TCM200001SSP01",
    session: null,
    data: [externalId, password],
    locale: "ko",
  });

  const loginData = res.svcRspnData;

  if (loginData === null) {
    throw new InternalServerError("Login Data is null");
  }

  return {
    extnUserId: loginData[0].F01,
    userId: loginData[0].F02,
    userNm: loginData[0].F03,
    loginTp: loginData[0].F04 as "1" | "2" | "3",
    sessionId: loginData[0].F05,
    sessionKey: loginData[0].F06,
    wrkTp: loginData[0].F07 as "1" | "2" | "3",
    brkrId: loginData[0].F08,
  };
};

export const socialSignInService = async (externalId: string, sub: string) => {
  const res = await callTms<StringRspnData<9>>({
    svcId: "TCM200001SSP03",
    session: null,
    data: [externalId, sub],
    locale: "ko",
  });

  const loginData = res.svcRspnData;

  if (loginData === null) {
    throw new InternalServerError("Login Data is null");
  }

  return {
    extnUserId: loginData[0].F01,
    userId: loginData[0].F02,
    userNm: loginData[0].F03,
    loginTp: loginData[0].F04 as "1" | "2" | "3",
    sessionId: loginData[0].F05,
    sessionKey: loginData[0].F06,
    wrkTp: loginData[0].F07 as "1" | "2" | "3",
    brkrId: loginData[0].F08,
  };
};

export const signOutService = async (corpCd: string, externId: string) => {};

export const sessionService = async (refreshToken: string): Promise<Session> => {
  const session = await parseJwtToken(refreshToken, "refresh");
  delete session.iat;
  delete session.exp;
  session.iss = new Date().toISOString();

  // const accessToken = await generateAccessToken(session);
  return session;
};

export const getServerSession = async (): Promise<Session | null> => {
  "use server";
  try {
    const refreshToken = (await cookies()).get(REFRESH_COOKIE_NAME);
    if (!refreshToken) return null;

    return sessionService(refreshToken.value);
  } catch (e) {
    console.error(e);
    redirect("/signout");
  }
};
