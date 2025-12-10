import SigninForm from "@/components/signin/signin-form";
import css from "./signin.module.scss";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import KakaoLoginIcon from "/public/assets/svg/kakao.svg?react";
import { UnstyledButton } from "@mantine/core";
import { GradientBackground } from "@/components/background";
import { GetServerSideProps } from "next";
import { KAKAO_REDIRECT_URI } from "@/constants";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nConfig from "/next-i18next.config";

type Props = {
  kakaoSignInUrl: string;
};

export default function Page({ kakaoSignInUrl }: Props) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  console.log("i18n", i18n);

  const locale = router.query.locale?.toString() || "ko";

  return (
    <div className={"mobileLayout"}>
      <GradientBackground />

      <div className={css.wrap}>
        <div className={css.inner}>
          <div className={css.header}>
            <div className={css.logo}>👤</div>
            <h1 className={css.title}>{t("auth:0001")}</h1>
            <p className={css.subtitle}>계정에 로그인하여 서비스를 이용하세요</p>
          </div>

          <SigninForm />

          <div className={css.divider}>
            <span>또는</span>
          </div>

          <div className={css.socialSection}>
            <div className={css.socialTitle}>소셜 계정으로 로그인</div>

            <UnstyledButton component={"a"} href={kakaoSignInUrl} className={css.kakaoSigninButton}>
              <KakaoLoginIcon />
              <span>{t("auth:0002")}</span>
            </UnstyledButton>
          </div>

          <div className={css.signupLink}>
            <span>계정이 없으신가요? </span>
            <Link href={`/${locale}/signup`}>회원가입</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const locale = context.params?.locale?.toString() || "ko";
  const config = await serverSideTranslations(locale, ["common", "auth"], i18nConfig);

  // https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api
  const kakaoSignInUrl = new URL("https://kauth.kakao.com/oauth/authorize");
  kakaoSignInUrl.searchParams.set("response_type", "code");
  kakaoSignInUrl.searchParams.set("client_id", process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY);
  kakaoSignInUrl.searchParams.set("redirect_uri", KAKAO_REDIRECT_URI);
  kakaoSignInUrl.searchParams.set("prompt", "select_account");

  return {
    props: {
      ...config,
      kakaoSignInUrl: kakaoSignInUrl.toString(),
    },
  };
};
