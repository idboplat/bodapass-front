import { nativeAlert, sendMessageToDevice } from "@/hooks/use-device-api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import languageDetector from "@/libraries/i18n/language-detector";
import { i18nConfig } from "/next-i18next.config";
import { useKakaoLoginMutation } from "@/hooks/tms/use-auth";
import { LoadingOverlay } from "@mantine/core";
import { SESSION_LOCAL_STORAGE_KEY, SOCIAL_LOGIN_SESSION_STORAGE_KEY } from "@/constants";
import { DEVICE_API } from "@/types/common";

// https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-token
// 번역안함.
export default function Page() {
  const router = useRouter();
  const locale = languageDetector.detect() || i18nConfig.i18n.defaultLocale;
  const code = router.query.code?.toString();

  const [isLoading, setIsLoading] = useState(false);

  const { mutation } = useKakaoLoginMutation({ locale });

  useEffect(() => {
    if (!code) return;
    if (isLoading) return; // !!중요!! 한번만 성공하도록함, 두번 호출되는 것을 방지!!
    if (mutation.isPending) return;

    setIsLoading(() => true);

    mutation.mutate(
      { code },
      {
        onSuccess: (data) => {
          if ("token" in data) {
            // 1. 가입안된 소셜계정
            const searchParams = new URLSearchParams();
            searchParams.set("loginTp", "2"); // 소셜
            sessionStorage.setItem(
              SOCIAL_LOGIN_SESSION_STORAGE_KEY,
              JSON.stringify({
                externalId: data.token.externalId,
                code: data.token.code, // 소셜 아이디
              }),
            );

            router.push(`/${locale}/signup?${searchParams.toString()}`);
          } else {
            // 2. 가입된 소셜계정
            if (!!window.ReactNativeWebView) {
              sendMessageToDevice({
                type: DEVICE_API.updateDeviceSession,
                payload: data.session, // !!주의 Session만 전달
              } satisfies {
                type: string;
                payload: Session;
              });
            } else {
              // 2-1. 테스트 로그인
              localStorage.setItem(SESSION_LOCAL_STORAGE_KEY, JSON.stringify(data));
              const result = confirm("테스트 로그인 성공");

              if (result) {
                window.location.href = "/";
              }
            }
          }
        },
        onError: (error) => {
          setIsLoading(() => false);
          nativeAlert("세션이 만료되었습니다. 다시 로그인해주세요.");
          router.replace(`/${locale}/signin`);
        },
      },
    );
  }, [mutation, code, locale, router, isLoading]);

  return (
    <div
      style={{
        minWidth: "100svw",
        minHeight: "100svh",
        position: "relative",
      }}
    >
      <LoadingOverlay visible={isLoading} />
    </div>
  );
}
