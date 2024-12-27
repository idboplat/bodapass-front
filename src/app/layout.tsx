// css 순서변경 금지
import "@/styles/agGrid.scss";
import "@/styles/mantine/core.scss";
import "@/styles/mantine/theme.scss";
import "@/styles/mantine/dates.scss";
import "@/styles/global.scss";

import type { Viewport } from "next";
import { PropsWithChildren } from "react";
import Configs from "@/components/config";
import { getDefaultMetadata } from "@/utils/getDefaultMetadata";
import StyledComponentsRegistry from "@/libraries/styled-components-registry";
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
    <html 
      lang="ko" 
      style={{ overflowX: "auto", touchAction: "none", minWidth: "1903px", maxWidth: "1920px" }}
      suppressHydrationWarning>
      <head>
        {/* run dev - 개발 체크. react-scan */}
        {/* <Script src="https://unpkg.com/react-scan/dist/auto.global.js" async /> */}
      </head>
      <body style={{ overflowX: "auto", touchAction: "none", WebkitTextSizeAdjust: "none", minWidth: "1903px", maxWidth: "1920px" }}>
        <StyledComponentsRegistry>
          <Configs defaultColorScheme="light">{children}</Configs>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
