import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import RemoteCrewSignupHome from "@/components/signup/remote-crew-signup-home";
import { useRouter } from "next/router";
import { TSignUpDto } from "@/libraries/auth/auth.dto";
import { useEffect, useState } from "react";
import { z } from "zod";
import { SOCIAL_LOGIN_SESSION_STORAGE_KEY } from "@/constants";

// 비대면 팀원 회원가입 페이지
export default function Page() {
  const router = useRouter();
  const locale = router.query.locale?.toString() || "ko";
  const loginTp = (router.query.loginTp?.toString() || "4") as "1" | "2" | "3" | "4" | "5";
  const workerTp = (router.query.workerTp?.toString() || "2") as "2" | "3";
  const brokerId = (router.query.brkrId?.toString() || "") as TSignUpDto["brkrId"];

  const [isLoading, setIsLoading] = useState(true);
  const [socialLoginSession, setSocialLoginSession] = useState<{
    code: string;
    externalId: string;
  } | null>(null);

  useEffect(() => {
    try {
      // sessionStorage에서 code를 가져옴
      if (loginTp !== "2") {
        setIsLoading(() => false);
        return;
      }

      const code = JSON.parse(sessionStorage.getItem(SOCIAL_LOGIN_SESSION_STORAGE_KEY) || "{}");
      const result = z.object({ code: z.string(), externalId: z.string() }).parse(code);

      if (!code) {
        // 소셜로그인인데 code가 없으면 로그인 페이지로 이동
        router.replace(`/${locale}/signin`);
        return;
      }

      setSocialLoginSession(() => result);
      setIsLoading(() => false);
    } catch (error) {
      console.error(error);
      sessionStorage.removeItem(SOCIAL_LOGIN_SESSION_STORAGE_KEY);
      router.replace(`/${locale}/signin`);
    }
  }, [locale, router, loginTp]);

  if (!router.isReady || isLoading) return null;

  return (
    <RemoteCrewSignupHome
      loginTp={loginTp}
      workerTp={workerTp}
      initState={{
        brokerId,
        externalId: socialLoginSession?.externalId || "",
        password: socialLoginSession?.code || "",
      }}
    />
  );
}

const getStaticProps = makeStaticProps(["common", "auth"]);
export { getStaticPaths, getStaticProps };
