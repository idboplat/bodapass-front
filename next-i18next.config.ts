import { UserConfig } from "next-i18next";
import path from "path";

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
  localePath:
    typeof window === "undefined"
      ? path.resolve(process.cwd(), "public", "locales")
      : "./public/locales",
};

export default i18nConfig;
