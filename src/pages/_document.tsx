import { THEME_LOCAL_STORAGE_KEY } from "@/constants";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { i18nConfig } from "/next-i18next.config";

export default class MyDocument extends Document {
  render() {
    const currentLocale =
      this.props.__NEXT_DATA__.query.locale?.toString() || i18nConfig.i18n.defaultLocale;

    return (
      <Html lang={currentLocale} {...mantineHtmlProps}>
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
}
