import { userAgent } from "next/server";
import ClovaHome from "@/components/ocr/clova-home";
import { headers } from "next/headers";

export default async function Page() {
  const agent = userAgent({ headers: await headers() });
  const isMobile = agent.device.type === "mobile" || agent.device.type === "tablet";
  return <ClovaHome isMobile={isMobile} type="idCard" />;
}
