import { ListCollectionsCommandOutput } from "@aws-sdk/client-rekognition";
import Client from "./page.client";

export default async function Page() {
  const url = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000";
  const response = await fetch(url + "/api/aws/collections", {
    next: { revalidate: 0 },
  });
  const json: { message: string; data: ListCollectionsCommandOutput } = await response.json();

  return <Client data={json.data} />;
}

export const dynamic = "force-dynamic";
