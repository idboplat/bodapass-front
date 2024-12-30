import path from "path";

const __dirname = path.resolve();

/** @type {import('next').NextConfig} */
const nextConfig = {
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
      warn: (message) => console.warn(message),
      debug: (message) => console.log(message),
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
  webpack: (config, options) => {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));
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
    // optimizePackageImports: ["@mantine/core", "@mantine/hooks"], // 테스트 필요 tree shaking
  },
};

export default nextConfig;
