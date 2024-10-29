import "@/style/global.scss";
import "@/style/theme.scss";
import "@/style/global.css";
import "@/style/globalTheme.css";

import type { Viewport } from "next";
import { PropsWithChildren } from "react";
import Configs from "./_component/config";
import { getDefaultMetadata } from "./_const/getDefaultMetadata";
import { ColorSchemeScript } from "@mantine/core";

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
    // https://github.com/mantinedev/mantine/issues/7008
    <html lang="ko" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        {/* Pretendard Font */}
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <Configs defaultColorScheme="light">{children}</Configs>
      </body>
    </html>
  );
}
