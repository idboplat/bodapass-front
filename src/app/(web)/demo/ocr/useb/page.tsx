import { userAgent } from "next/server";
import { headers } from "next/headers";
import UsdBHome from "@/components/ocr/useb-home";

export default async function Page() {
  const agent = userAgent({ headers: await headers() });
  const isMobile = agent.device.type === "mobile" || agent.device.type === "tablet";
  return <UsdBHome isMobile={isMobile} />;
}
