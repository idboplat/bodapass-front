import { ListCollectionsCommandOutput } from "@aws-sdk/client-rekognition";
import Client from "./page.client";

export default async function Page() {
  const response = await fetch("http://localhost:3000/api/aws/collections", {
    next: { revalidate: 0 },
  });
  const json: { message: string; data: ListCollectionsCommandOutput } = await response.json();

  return <Client data={json.data} />;
}

export const dynamic = "force-dynamic";
