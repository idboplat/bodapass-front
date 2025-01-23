import { userAgent } from "next/server";
import OCRHome from "@/components/ocr/Home";
import { headers } from "next/headers";

export default async function Page() {
  const agent = userAgent({ headers: await headers() });
  const isMobile = agent.device.type === "mobile" || agent.device.type === "tablet";
  return <OCRHome isMobile={isMobile} type="passport" />;
}
