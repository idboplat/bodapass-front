import localFont from "next/font/local";

/** https://github.com/notofonts/noto-fonts/tree/07db6d0d84682ffe11e14da4a9cbabdaaf2e909b/unhinted/otf/NotoSerifTamilSlanted */
export const pretendard = localFont({
  src: [
    {
      path: "../assets/fonts/Pretendard-Thin.woff",
      weight: "100",
    },
    {
      path: "../assets/fonts/Pretendard-ExtraLight.woff",
      weight: "200",
    },
    {
      path: "../assets/fonts/Pretendard-Light.woff",
      weight: "300",
    },
    {
      path: "../assets/fonts/Pretendard-Regular.woff",
      weight: "400",
    },
    {
      path: "../assets/fonts/Pretendard-Medium.woff",
      weight: "500",
    },
    {
      path: "../assets/fonts/Pretendard-SemiBold.woff",
      weight: "600",
    },
    {
      path: "../assets/fonts/Pretendard-Bold.woff",
      weight: "700",
    },
    {
      path: "../assets/fonts/Pretendard-ExtraBold.woff",
      weight: "800",
    },
    {
      path: "../assets/fonts/Pretendard-Black.woff",
      weight: "900",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});
