import { existsSync } from "fs";
import { UserConfig } from "next-i18next";
import path from "path";
import { fileURLToPath } from "url";

// Vercel 환경에서 올바른 경로 찾기
const getServerLocalePath = () => {
  if (typeof window !== "undefined") {
    return "/locales"; // 클라이언트
  }

  const isVercel = process.env.VERCEL === "1";
  const cwd = process.cwd();

  if (isVercel) {
    // Vercel에서 가능한 경로들
    const possiblePaths = [
      path.join(cwd, ".next", "server", "public", "locales"),
      path.join(cwd, "public", "locales"),
      path.resolve(cwd, "public", "locales"),
    ];

    // 존재하는 첫 번째 경로 반환
    for (const p of possiblePaths) {
      if (existsSync(p)) {
        console.log("Found localePath:", p);
        return p;
      }
    }

    // 없으면 기본값
    return path.join(cwd, "public", "locales");
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
