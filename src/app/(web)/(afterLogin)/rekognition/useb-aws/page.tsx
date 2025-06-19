import { userAgent } from "next/server";
import Client from "./page.client";
import { headers } from "next/headers";

export default async function Page() {
  const agent = userAgent({ headers: await headers() });
  const isMobile = agent.device.type === "mobile" || agent.device.type === "tablet";
  return <Client isMobile={isMobile} />;
}
