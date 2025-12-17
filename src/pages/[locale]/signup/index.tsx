import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { signUpDto } from "@/libraries/auth/auth.dto";
import RemoteCrewSignupHome from "@/components/signup/remote-crew-signup-home";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SOCIAL_LOGIN_SESSION_STORAGE_KEY } from "@/constants";
import { z } from "zod";
import { TIdTp, TLoginTp, TWrkTp } from "@/types/common";
import LeaderSignupHome from "@/components/signup/leader-signup-home";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import IndexHome from "@/components/signup/index-home";
import { SignupProvider } from "@/components/signup/context";

export default function Page() {
  const router = useRouter();
  const { t } = useTranslation();
  const locale = router.query.locale?.toString() || "ko";

  const wrkTp = (router.query.wrkTp?.toString() || "") as TWrkTp;
  /** 회원가입 단계 */
  const step = router.query.step?.toString() || "1";
  const loginTp = (router.query.loginTp?.toString() || "4") as TLoginTp;
  const idTp = (router.query.idTp?.toString() || "1") as TIdTp;
  /** 반장 아이디(추천인) */
  const brkrId = router.query.brkrId?.toString() || "";

  const [isLoading, setIsLoading] = useState(true);
  const [socialLoginSession, setSocialLoginSession] = useState<{
    code: string;
    externalId: string;
  } | null>(null);
  const [images, setImages] = useState<Blob[]>([]);

  const form = useForm({
    // mode: "onTouched", // 직접 검증 처리하기 위해 막음
    resolver: zodResolver(signUpDto),
    defaultValues: {
      // step1
      cntryCd: "KR",

      userNm: "",
      idNo1: "",
      idNo2: "",
      zipCd: "",
      addr: "",
      addrDtil: "",
      tel: "",

      // 소셜로그인의 경우는 socialLoginSession로 대치해서 서비스 호출
      externalId: "",
      password: "",
      passwordConfirm: "",

      //
      corpCd: "",
      emailAddr: "",
    },
  });

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

  const saveImages = useCallback(
    (images: Blob[]) => {
      setImages(() => images);
    },
    [setImages],
  );

  const resetImages = useCallback(() => {
    setImages(() => []);
  }, [setImages]);

  const value = useMemo(
    () => ({
      wrkTp,
      loginTp,
      idTp,
      brkrId,
      images,
      socialLoginSession,
      saveImages,
      resetImages,
      step,
      locale,
    }),
    [
      wrkTp,
      loginTp,
      idTp,
      brkrId,
      socialLoginSession,
      saveImages,
      resetImages,
      images,
      step,
      locale,
    ],
  );

  if (!router.isReady || isLoading) return null;

  // 반장 회원가입
  if (step !== "1" && wrkTp === "1") {
    return (
      <SignupProvider value={value}>
        <FormProvider {...form}>
          <LeaderSignupHome />
        </FormProvider>
      </SignupProvider>
    );
  }

  // 팀원/일용직 회원가입
  if (step !== "1" && (wrkTp === "2" || wrkTp === "3")) {
    return (
      <SignupProvider value={value}>
        <FormProvider {...form}>
          <RemoteCrewSignupHome />
        </FormProvider>
      </SignupProvider>
    );
  }

  return (
    <SignupProvider value={value}>
      <IndexHome loginTp={loginTp} locale={locale} />
    </SignupProvider>
  );
}

const getStaticProps = makeStaticProps(["common", "auth"]);
export { getStaticPaths, getStaticProps };
