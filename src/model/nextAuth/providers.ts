import { TBW_000001_P01 } from "@/type/api";
import { CredentialAuthorize, Credentials } from "@/type/nextAuth";
import callTms from "@/model/callTms";

export const credentialAuthorize: CredentialAuthorize = async (_credentials, req) => {
  try {
    const credentials = _credentials as unknown as Credentials;
    if (!credentials) return null;
    const TBW_000001_P01Res = await callTms<TBW_000001_P01>({
      svcId: "TBW_000001_P01",
      data: [credentials.email, credentials.password],
      session: null,
    });
    const TBW_000001_P01Data = TBW_000001_P01Res.svcRspnData;
    if (TBW_000001_P01Data === null) {
      throw new Error("관리자에게 문의하세요");
    }

    console.log("TBW_000001_P01Data", TBW_000001_P01Data);

    const { F01, F03, F04, F05, F06 } = TBW_000001_P01Data[0];
    return {
      id: F01,
      sessionId: F03,
      sessionKey: F04,
      errorMsg: undefined,
      corpCd: F05,
      corpGrpTp: F06,
    };
  } catch (error) {
    console.error("EmailLogin", error);

    return {
      id: "error",
      sessionId: "",
      sessionKey: "",
      errorMsg: error instanceof Error ? error.message : "서비스 접근권한이 없습니다.",
      corpCd: "",
      corpGrpTp: "",
    };
  }
};
