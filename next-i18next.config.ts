import { UserConfig } from "next-i18next";
import path from "path";

export const i18nConfig: UserConfig = {
  debug: false,
  i18n: {
    defaultLocale: "ko",
    locales: ["ko", "en"],
  },
  localePath: typeof window === "undefined" ? path.resolve("./public/locales") : "/locales",
  fallbackLng: "ko",
  reloadOnPrerender: process.env.NODE_ENV === "development",
};

export default i18nConfig;
