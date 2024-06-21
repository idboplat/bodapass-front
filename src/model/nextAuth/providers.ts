import { B0001AData } from "@/type/api";
import { CredentialAuthorize, Credentials } from "@/type/nextAuth";
import callTms from "@/model/callTms";

export const credentialAuthorize: CredentialAuthorize = async (_credentials, req) => {
  try {
    const credentials = _credentials as unknown as Credentials;
    if (!credentials) return null;
    const B0001ARes = await callTms<B0001AData>({
      svcId: "TBW_000001_P01",
      data: [credentials.email, credentials.password, credentials.corpCode],
      session: null,
    });
    const B0001AData = B0001ARes.svcRspnData;
    if (B0001AData === null) {
      throw new Error("관리자에게 문의하세요");
    }
    console.log("B0001AData", B0001AData[0]);

    const { F01, F02, F07 } = B0001AData[0];
    return {
      id: credentials.email,
      sessionId: F01,
      sessionKey: F02,
      errorMsg: undefined,
      corpCd: F07,
    };
  } catch (error) {
    console.error("EmailLogin", error);

    return {
      id: "error",
      sessionId: "",
      sessionKey: "",
      errorMsg: error instanceof Error ? error.message : "서비스 접근권한이 없습니다.",
      corpCd: "",
    };
  }
};
