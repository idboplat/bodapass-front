import { UserConfig } from "next-i18next";
import path from "path";

// Vercel 환경에서 올바른 경로 찾기
const getServerLocalePath = () => {
  if (typeof window !== "undefined") {
    return "/locales"; // 클라이언트
  }

  const isVercel = process.env.VERCEL === "1";

  if (isVercel) {
    return path.resolve("./locales");
  }

  // 로컬 개발 환경
  return path.resolve("./public/locales");
};

// https://github.com/vercel/next.js/discussions/47187
export const i18nConfig: UserConfig = {
  debug: false,
  i18n: {
    defaultLocale: "ko",
    locales: ["ko", "en"],
  },
  defaultNS: "common",
  fallbackLng: "ko",
  reloadOnPrerender: process.env.NODE_ENV === "development",
  localePath: getServerLocalePath(),
};

export default i18nConfig;
