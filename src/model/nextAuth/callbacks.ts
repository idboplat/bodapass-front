import { CallbacksJwt, CallbacksSession, CallbacksSignIn, newSession } from "@/type/nextAuth";
import { addMinutes, differenceInSeconds, formatISO } from "date-fns";
import { EXPIRE_MIN } from "./config";

export const DEFAULT_ERROR_MSG = "서비스 접근권한이 없습니다.";

export const signIn: CallbacksSignIn = async ({ user }) => {
  if (!user) return false;
  const errorMsg = user.errorMsg;

  if (user.id === "error" || errorMsg !== undefined) {
    const encodeErrMsg = encodeURIComponent(errorMsg || DEFAULT_ERROR_MSG);
    throw new Error(encodeErrMsg);
  }

  return true;
};

export const jwt: CallbacksJwt = async ({ token, user, session: _session, trigger }) => {
  const newSession = _session as newSession;
  const today = new Date();

  if (user) {
    // user를 토큰에 저장, user는 첫 로그인시만 들어온다.
    const iat = formatISO(today);
    const exp = formatISO(addMinutes(today, EXPIRE_MIN));
    token.user = { ...user, iat, exp };
  }

  if (token?.user === undefined || token?.user === null) return token;

  if (trigger === "update") {
    if (newSession.type === "updateSession") {
      // 세션연장
      token.user.exp = formatISO(addMinutes(today, EXPIRE_MIN));
    }
  }

  // 토큰 만료시간 체크
  const expTime = new Date(token.user.exp);
  const diff = differenceInSeconds(expTime, today);
  if (diff <= 0) {
    throw new Error("토큰 만료");
  }

  return token;
};

export const session: CallbacksSession = async ({ session, token }) => {
  if (!session) return session;

  session.user = { ...token.user };
  return session;
};
