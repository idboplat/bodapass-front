import { UserConfig } from "next-i18next";

export const i18nConfig: UserConfig = {
  debug: false,
  i18n: {
    defaultLocale: "ko",
    locales: ["ko", "en"],
  },
  fallbackLng: "ko",
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
