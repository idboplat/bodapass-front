import path from "node:path";
import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  typescript: {
    // !! WARN !!
    // ts빌드 에러를 무시하고 싶다면 아래 옵션을 true로 변경하세요.
    ignoreBuildErrors: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "styles")], // style 폴더에 있는 파일은 이름만으로 import 가능(경로 축약)
    prependData: `
      @use "var";
      @use "util";
      @use "placeholder";
    `, // 위 파일은 import 하지 않아도 된다.
    silenceDeprecations: ["legacy-js-api"], // sass warning 제거
    logger: {
      warn: (message: any) => console.warn(message),
      debug: (message: any) => console.log(message),
    },
  },
  compiler: {
    // removeConsole: {
    // exclude: ['error', 'warn', 'log', 'info'],
    // },
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async rewrites() {
    return [
      {
        source: "/cloudfront/:path*",
        destination: "https://d1e7n5w7ku9qm7.cloudfront.net/:path*", // cloudfront로 리다이렉트
      },
    ];
  },
  webpack: (config, options) => {
    /** SVGR **/
    const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.(".svg"));
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
  experimental: {
    authInterrupts: true, // 401, 403
    reactCompiler: true,
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"], // tree shaking
  },
};

const isEnableSentry = !!process.env.NEXT_PUBLIC_SENTRY_DSN && !!process.env.SENTRY_AUTH_TOKEN;
export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "yisp",
  project: "2025-cw",

  // Only print logs for uploading source maps in CI
  silent: !isEnableSentry,
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  // widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  // reactComponentAnnotation: {
  //   enabled: true,
  // },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  // hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  // disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  // automaticVercelMonitors: true,

  telemetry: false,
  autoInstrumentMiddleware: false,
  autoInstrumentAppDirectory: true,
  autoInstrumentServerFunctions: true,
  sourcemaps: {
    disable: true,
  },
});
