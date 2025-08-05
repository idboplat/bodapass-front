import { THEME_LOCAL_STORAGE_KEY } from "@/constants";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="ko" {...mantineHtmlProps}>
      <Head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {process.env.NODE_ENV === "development" && (
          <Script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
        )}

        <ColorSchemeScript localStorageKey={THEME_LOCAL_STORAGE_KEY} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
