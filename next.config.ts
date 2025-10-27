import path from "node:path";
import type { NextConfig } from "next";

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
  headers: async () => {
    // https://binux.tistory.com/172
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
      {
        source: "/.well-known/assetlinks.json",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
  rewrites: async () => {
    return [
      {
        source: "/middleware/:path*",
        destination: "http://64.110.72.61:3100/:path*",
      },
    ];
  },
  webpack: (config, options) => {
    // face-api.js
    config.resolve.fallback = {
      fs: false,
      path: false,
      encoding: false,
    };

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
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgo: false, // svgo option을 사용하고 싶다면 false를 true로 변경하세요
              // https://svgo.dev/docs/plugins/
              // svgoConfig: {
              //   plugins: [
              //     {
              //       name: "preset-default",
              //       params: {
              //         overrides: {
              //           removeViewBox: false,
              //         },
              //       },
              //     },
              //   ],
              // },
            },
          },
        ],
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

export default nextConfig;
