import { useEffect } from "react";
import { useRouter } from "next/router";
import languageDetector from "./language-detector";
import { i18nConfig } from "/next-i18next.config";

export const useRedirect = (to?: string) => {
  const router = useRouter();
  const path = to || router.asPath;

  // language detection
  useEffect(() => {
    const detectedLng = languageDetector.detect() || i18nConfig.i18n.defaultLocale;

    if (path.startsWith("/" + detectedLng) && router.route === "/404") {
      // prevent endless loop
      router.replace("/" + detectedLng + router.route);
      return;
    }

    languageDetector.cache?.(detectedLng);
    router.replace("/" + detectedLng + path);
  }, []);

  return <></>;
};

export const Redirect = () => {
  useRedirect();
  return <></>;
};

// eslint-disable-next-line react/display-name
export const getRedirect = (to?: string) => () => {
  useRedirect(to);
  return <></>;
};
