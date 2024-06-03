import initTheme from "@/app/(config)/_lib/initTheme";

declare module "@emotion/react" {
  interface Theme extends ReturnType<typeof initTheme> {}
}

declare module "next-auth" {
  interface User {
    id: string;
    sessionId: string;
    sessionKey: string;
    errorMsg?: string;
  }

  interface Session {
    user: {
      id: string;
      sessionId: string;
      sessionKey: string;
      errorMsg?: string;
      exp: string;
      iat: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      sessionId: string;
      sessionKey: string;
      errorMsg?: string;
      exp: string;
      iat: string;
    };
  }
}

export {};
