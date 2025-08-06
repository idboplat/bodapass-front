import languageDetector from "next-language-detector";
import { i18nConfig } from "/next-i18next.config";

export default languageDetector({
  fallbackLng: i18nConfig.i18n.defaultLocale,
  supportedLngs: i18nConfig.i18n.locales,
});
