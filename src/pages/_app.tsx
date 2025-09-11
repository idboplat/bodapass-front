import type { AppProps } from "next/app";
import { NextPageWithLayout } from "@/types/common";
import { appWithTranslation } from "next-i18next";

// css 순서변경 금지
import "@/styles/mantine/core.scss";
import "@/styles/mantine/dates.scss";
import "@/styles/mantine/theme.scss";
import "@/styles/global.scss";

// modal css
import "@/components/common/modal/components.module.scss";
import "@/components/common/modal/modal-container.module.scss";

import Configs from "@/components/config";
import ToastBox from "@/components/config/toast-box";
import PortalModalContainer from "@/components/common/modal/portal-modal-container";
import Head from "next/head";
import NoSSR from "@/components/no-ssr";
import Script from "next/script";
import favicon from "/public/favicon.ico";
import faviconDev from "/public/favicon-dev.ico";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts
function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <>
      <Head>
        <title>일당백</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1, viewport-fit=cover"
        />
        <link
          rel="icon"
          href={process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? favicon.src : faviconDev.src}
        />
      </Head>
      <Configs>
        <NoSSR>
          <Component {...pageProps} />
        </NoSSR>
        <PortalModalContainer />
        <ToastBox />

        {/* kakao map */}
        <Script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&libraries=services,clusterer&autoload=false`}
        />
      </Configs>
    </>,
  );
}

// export default appWithTranslation(App);
export default App;
