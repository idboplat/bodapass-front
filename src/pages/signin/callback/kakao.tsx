import { sendMessageToDevice } from "@/hooks/use-device-api";
import ky from "ky";
import { useRouter } from "next/router";
import { useEffect } from "react";
import languageDetector from "@/libraries/i18n/language-detector";
import { i18nConfig } from "/next-i18next.config";
import { logger } from "@/apis/logger";

// https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-token
// 번역안함.
export default function Page() {
  const router = useRouter();
  const code = router.query.code?.toString();

  useEffect(() => {
    if (!code) return;

    const getSessionAndSaveDevice = async () => {
      try {
        const json = await ky
          .post<{ session: Session }>("/api/auth/token/kakao", {
            headers: { "X-CODE": code },
          })
          .json();

        console.log("json", json);

        await sendMessageToDevice({
          type: "updateDeviceSession",
          payload: { session: json.session },
        });
      } catch (error) {
        if (error instanceof Error) {
          logger(error.message);
          alert(error.message);
        }
        const locale = languageDetector.detect() || i18nConfig.i18n.defaultLocale;
        router.replace(`/${locale}/signin`);
      }
    };

    getSessionAndSaveDevice();
  }, [code, router]);

  return <div>Loading...</div>;
}
