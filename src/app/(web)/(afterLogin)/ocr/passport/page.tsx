import { userAgent } from "next/server";
import OCRHome from "@/components/ocr/Home";
import { headers } from "next/headers";

export default function Page() {
  const agent = userAgent({ headers: headers() });
  const isMobile = agent.device.type === "mobile" || agent.device.type === "tablet";
  return <OCRHome isMobile={isMobile} type="passport" />;
}
