import SigninForm from "@/components/signin/signin-form";
import css from "./signin.module.scss";
import { KAKAO_REDIRECT_URI } from "@/constants";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import KakaoLoginIcon from "/public/assets/svg/kakao.svg?react";
import { Button, UnstyledButton } from "@mantine/core";
import { GradientBackground } from "@/components/background";

export default function Page() {
  const router = useRouter();
  const { t } = useTranslation();
  const locale = router.query.locale?.toString() || "ko";

  const onClickKakaoLogin = () => {
    const kakaoLoginUrl = new URL("https://kauth.kakao.com/oauth/authorize");
    kakaoLoginUrl.searchParams.set("response_type", "code");
    kakaoLoginUrl.searchParams.set("client_id", process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY);
    kakaoLoginUrl.searchParams.set("redirect_uri", KAKAO_REDIRECT_URI);
    kakaoLoginUrl.searchParams.set("prompt", "select_account");
    window.location.href = kakaoLoginUrl.toString();
  };

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
            <UnstyledButton className={css.kakaoSigninButton} onClick={onClickKakaoLogin}>
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

const getStaticProps = makeStaticProps(["common", "auth"]);
export { getStaticPaths, getStaticProps };
