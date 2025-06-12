import type { Viewport } from "next";
import { PropsWithChildren } from "react";
import Configs from "@/components/config";
import { getDefaultMetadata } from "@/utils/getDefaultMetadata";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { THEME_LOCAL_STORAGE_KEY } from "@/constants";
//import Script from "next/script";

// css 순서변경 금지
import "@/styles/mantine/core.scss";
import "@/styles/mantine/theme.scss";
import "@/styles/mantine/dates.scss";
import "@/styles/global.scss";

// global-error css
import "@/components/common/modal/Components.module.scss";
import "@/components/common/modal/ModalContainer.module.scss";

export const metadata = getDefaultMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko" {...mantineHtmlProps}>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {/* run dev - 개발 체크. react-scan */}
        {/* <Script src="https://unpkg.com/react-scan/dist/auto.global.js" async /> */}
        <ColorSchemeScript localStorageKey={THEME_LOCAL_STORAGE_KEY} />
      </head>
      <body suppressHydrationWarning>
        <Configs>{children}</Configs>
      </body>
    </html>
  );
}
