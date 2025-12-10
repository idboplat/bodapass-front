import { UserConfig } from "next-i18next";

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
};

export default i18nConfig;
