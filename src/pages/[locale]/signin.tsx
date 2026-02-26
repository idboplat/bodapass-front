import SigninForm from "@/components/signin/signin-form";
import css from "./signin.module.scss";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { LoadingOverlay, UnstyledButton } from "@mantine/core";
import { GetServerSideProps } from "next";
import { KAKAO_REDIRECT_URI } from "@/constants";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nConfig from "/next-i18next.config";
import KakaoIcon from "/public/assets/svg/kakao-icon.svg";
import { useEmailLoginMutation } from "@/hooks/tms/use-auth";
import { TSignInDto } from "@/libraries/auth/auth.dto";

type Props = {
  kakaoSignInUrl: string;
};

export default function Page({ kakaoSignInUrl }: Props) {
  const router = useRouter();
  const { t } = useTranslation();

  const locale = router.query.locale?.toString() || "ko";

  const { isLoading, mutation } = useEmailLoginMutation();

  const submit = (data: TSignInDto) => {
    // nativeLogger(JSON.stringify(form.formState, null, 2));
    if (mutation.isPending) return;

    const trimmedExternalId = data.externalId.trim();
    const trimmedPassword = data.password.trim();

    if (!trimmedExternalId) {
      throw new Error("아이디를 입력해주세요.");
    }

    if (!trimmedPassword) {
      throw new Error("비밀번호를 입력해주세요.");
    }

    mutation.mutate({
      externalId: trimmedExternalId,
      password: trimmedPassword,
    });
  };

  return (
    <div className={"mobileLayout"}>
      <div className={css.wrap}>
        <div className={css.inner}>
          <div className={css.header}>
            <p className={css.title}>
              안녕하세요 :&#41;
              <br />
              보다패스 입니다.
            </p>
          </div>

          <SigninForm onSubmit={submit} isLoading={isLoading} />

          <div className={css.divider}>
            <span>간편 로그인</span>
          </div>

          <div className={css.socialSection}>
            <UnstyledButton component={"a"} href={kakaoSignInUrl} className={css.kakaoSigninButton}>
              <KakaoIcon />
            </UnstyledButton>
          </div>
        </div>
      </div>
      <LoadingOverlay visible={isLoading} />
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
  kakaoSignInUrl.searchParams.set("state", locale); // 소셜로그인후 arg를 전달가능함.

  return {
    props: {
      ...config,
      kakaoSignInUrl: kakaoSignInUrl.toString(),
    },
  };
};
