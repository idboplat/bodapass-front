// css 순서변경 금지
import "@/styles/mantine/core.scss";
import "@/styles/mantine/theme.scss";
import "@/styles/mantine/dates.scss";
import "@/styles/global.scss";

import type { Viewport } from "next";
import { PropsWithChildren } from "react";
import Configs from "@/components/config";
import { getDefaultMetadata } from "@/utils/getDefaultMetadata";
import { pretendard } from "@font";
import classNames from "classnames";
//import Script from "next/script";

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
    <html lang="ko" className={classNames(pretendard.variable)} suppressHydrationWarning>
      <head>
        {/* run dev - 개발 체크. react-scan */}
        {/* <Script src="https://unpkg.com/react-scan/dist/auto.global.js" async /> */}
      </head>
      <body>
        <Configs defaultColorScheme="light">{children}</Configs>
      </body>
    </html>
  );
}
