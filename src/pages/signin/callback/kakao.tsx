import { sendMessageToDevice } from "@/hooks/use-device-api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import languageDetector from "@/libraries/i18n/language-detector";
import { i18nConfig } from "/next-i18next.config";
import { nativeLogger } from "@/apis/native-logger";
import { useKakaoLoginMutation } from "@/hooks/tms/use-auth-service";
import { LoadingOverlay } from "@mantine/core";
import { SESSION_LOCAL_STORAGE_KEY } from "@/constants";

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
            router.push(
              `/${locale}/signup?loginTp=2&externalId=${data.token.externalId}&code=${data.token.code}`,
            );
          } else {
            // 로그인성공

            if (!!window.ReactNativeWebView) {
              sendMessageToDevice({
                type: "updateDeviceSession",
                payload: data,
              });
            } else {
              // 테스트 로그인
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
          nativeLogger(error.message);
          alert(error.message);
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
