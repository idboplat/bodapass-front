import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import LeaderSignupHome from "@/components/signup/leader-signup-home";
import { useRouter } from "next/router";
import { TSignUpDto } from "@/libraries/auth/auth.dto";
import { useEffect, useState } from "react";

// 반장 회원가입
export default function Page() {
  const router = useRouter();
  const locale = router.query.locale?.toString() || "test";
  const loginTp = (router.query.loginTp?.toString() || "4") as "1" | "2" | "3" | "4" | "5";
  const externalId = (router.query.externalId?.toString() || "") as TSignUpDto["externalId"];

  const [isLoading, setIsLoading] = useState(true);
  const [code, setCode] = useState("");

  useEffect(() => {
    // sessionStorage에서 code를 가져옴
    if (loginTp !== "2") {
      setIsLoading(() => false);
      return;
    }

    const code = sessionStorage.getItem("code");

    if (!code) {
      // 소셜로그인인데 code가 없으면 로그인 페이지로 이동
      router.replace(`/${locale}/signin`);
      return;
    }

    setCode(() => code);
    setIsLoading(() => false);
  }, [locale, router, loginTp]);

  if (!router.isReady || isLoading) return null;

  return <LeaderSignupHome loginTp={loginTp} initState={{ externalId, password: code }} />;
}

const getStaticProps = makeStaticProps(["common", "auth"]);
export { getStaticPaths, getStaticProps };
