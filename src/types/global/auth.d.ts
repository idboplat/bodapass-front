declare global {
  /** JWT payload */
  interface JWT {
    externalId: string;
    userId: string;
    userNm: string;
    loginTp: "1" | "2" | "3";
    sessionId: string;
    sessionKey: string;
    workerTp: "1" | "2" | "3";
    brokerId: string;

    /** 로그인한 ISO-시간 */
    loginAt: string;
    /** ISO-String */
    iss: string;
    iat?: number;
    exp?: number;
  }

  /** Signin Session */
  interface Session extends JWT {}

  /** AccessToken Payload */
  interface Payload extends JWT {}
}

export {};
