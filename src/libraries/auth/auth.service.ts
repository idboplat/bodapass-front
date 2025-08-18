import callTms from "../callTms";
import { InternalServerError } from "../error";
import { generateAccessToken, parseJwtToken } from "./jwt.service";
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

export const signService = async (externalId: string, password: string) => {
  const res = await callTms({
    svcId: "TCM200001SSP01",
    session: null,
    data: [externalId, password],
  });

  const loginData = res.svcRspnData;

  if (loginData === null) {
    throw new InternalServerError("Login Data is null");
  }

  return {
    externalId: loginData[0].F02,
    userId: loginData[0].F03,
    userNm: loginData[0].F04,
    loginTp: loginData[0].F05,
    sessionId: loginData[0].F06,
    sessionKey: loginData[0].F07,
    workerTp: loginData[0].F08,
    brokerId: loginData[0].F09,
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
