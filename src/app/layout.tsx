import "@/style/global.css";
import "@/style/globalTheme.css";
import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { PropsWithChildren } from "react";
import Configs from "./_component";

const font = Noto_Sans_KR({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tpro Admin",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko" color-theme="light">
      <body className={font.className}>
        <Configs>{children}</Configs>
      </body>
    </html>
  );
}
