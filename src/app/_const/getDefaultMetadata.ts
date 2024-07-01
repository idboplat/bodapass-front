import { Metadata } from "next";
import favicon from "@/app/favicon.ico";
import faviconDev from "@/app/favicon-dev.ico";

export const getDefaultMetadata = (): Metadata => {
  return {
    title: "Admin",
    icons: {
      icon: process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? favicon.src : faviconDev.src,
    },
  };
};
