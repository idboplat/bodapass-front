import { SOCIAL_LOGIN_SESSION_STORAGE_KEY } from "@/constants";
import { signUpDto } from "@/libraries/auth/auth.dto";
import { TIdTp, TLoginTp, TWrkTp } from "@/types/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { createContext, use, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export type TSocialLoginSession = {
  exterUserId: string;
  code: string;
};

type TSignupContext = {
  wrkTp: TWrkTp;
  loginTp: TLoginTp;
  idTp: TIdTp;
  brkrId: string;
  socialLoginSession: TSocialLoginSession | null;
  saveImages: (images: Blob[]) => void;
  resetImages: () => void;
  images: Blob[];
  step: string;
  locale: string;
  isLoading: boolean;
};

export const SignupCtx = createContext<TSignupContext | null>(null);

export const useSignupCtx = () => {
  const context = use(SignupCtx);
  if (!context) {
    throw new Error("useSignupContext must be used within a SignupProvider");
  }
  return context;
};

export const SignupProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const step = router.query.step?.toString() || "1";
  const loginTp = (router.query.loginTp?.toString() || "4") as TLoginTp;
  const wrkTp = (router.query.wrkTp?.toString() || "") as TWrkTp;
  const idTp = (router.query.idTp?.toString() || "1") as TIdTp;
  const locale = router.query.locale?.toString() || "ko";
  const brkrId = router.query.brkrId?.toString() || "";

  const [isLoading, setIsLoading] = useState(true);
  const [socialLoginSession, setSocialLoginSession] = useState<TSocialLoginSession | null>(null);
  const [images, setImages] = useState<Blob[]>([]);

  const value = useMemo(() => {
    const saveImages = (images: Blob[]) => setImages(() => images);
    const resetImages = () => setImages(() => []);

    return {
      step,
      loginTp,
      wrkTp,
      idTp,
      locale,
      brkrId,
      images,
      socialLoginSession,
      isLoading,
      saveImages,
      resetImages,
    };
  }, [step, loginTp, wrkTp, idTp, locale, brkrId, socialLoginSession, images, isLoading]);

  useEffect(() => {
    try {
      // sessionStorage에서 code를 가져옴
      if (value.loginTp !== "2") {
        setIsLoading(() => false);
        return;
      }

      const code = JSON.parse(sessionStorage.getItem(SOCIAL_LOGIN_SESSION_STORAGE_KEY) || "{}");
      const result = z.object({ code: z.string(), exterUserId: z.string() }).parse(code);

      if (!code) {
        // 소셜로그인인데 code가 없으면 로그인 페이지로 이동
        router.replace(`/${value.locale}/signin`);
        return;
      }

      setSocialLoginSession(() => result);
      setIsLoading(() => false);
    } catch (error) {
      console.error(error);
      sessionStorage.removeItem(SOCIAL_LOGIN_SESSION_STORAGE_KEY);
      router.replace(`/${value.locale}/signin`);
    }
  }, [router, value.locale, value.loginTp]);

  return <SignupCtx value={value}>{children}</SignupCtx>;
};

type TOnSiteSignupContext = {
  wrkTp: TWrkTp;
  loginTp: TLoginTp;
  idTp: TIdTp;
  saveImages: (images: Blob[]) => void;
  resetImages: () => void;
  images: Blob[];
  step: string;
  locale: string;
};

export const OnSiteSignupCtx = createContext<TOnSiteSignupContext | null>(null);

export const useOnSiteSignupCtx = () => {
  const context = use(OnSiteSignupCtx);
  if (!context) {
    throw new Error("useSignupContext must be used within a SignupProvider");
  }
  return context;
};

export const OnSiteSignupProvider = ({
  children,
  wrkTp,
  loginTp,
}: {
  children: React.ReactNode;
  wrkTp: TWrkTp;
  loginTp: TLoginTp;
}) => {
  const router = useRouter();

  const step = router.query.step?.toString() || "1";
  const idTp = (router.query.idTp?.toString() || "1") as TIdTp;
  const locale = router.query.locale?.toString() || "ko";

  const [images, setImages] = useState<Blob[]>([]);

  const value = useMemo(() => {
    const saveImages = (images: Blob[]) => setImages(() => images);
    const resetImages = () => setImages(() => []);

    return {
      step,
      loginTp,
      wrkTp,
      idTp,
      locale,
      images,
      saveImages,
      resetImages,
    };
  }, [step, loginTp, wrkTp, idTp, locale, images]);

  return <OnSiteSignupCtx value={value}>{children}</OnSiteSignupCtx>;
};

export const SignupFormProvider = ({ children }: { children: React.ReactNode }) => {
  const form = useForm({
    // mode: "onTouched", // 직접 검증 처리하기 위해 막음
    resolver: zodResolver(signUpDto),
    defaultValues: {
      corpCd: "",

      // 소셜로그인의 경우는 socialLoginSession로 대치해서 서비스 호출
      exterUserId: "",
      password: "",
      passwordConfirm: "",

      tel1: "",
      tel2: "",
      tel3: "",
      zipCd: "",
      addr: "",
      addrDtil: "",
      emailAddr: "",

      //
      cntryCd: "100",
      userNm: "",
      idNo1: "",
      idNo2: "",
      isuDd: "",
      idSn: "",
      visaCd: "",
    },
  });

  return <FormProvider {...form}>{children}</FormProvider>;
};
