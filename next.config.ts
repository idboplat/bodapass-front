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

export default nextConfig;
