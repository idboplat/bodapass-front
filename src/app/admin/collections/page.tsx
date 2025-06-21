import { ListCollectionsCommandOutput } from "@aws-sdk/client-rekognition";
import Client from "./page.client";
import ky from "ky";

export default async function Page() {
  const url = process.env.NEXT_PUBLIC_FRONT_URL;

  const json = await ky
    .get<{ message: string; data: ListCollectionsCommandOutput }>(url + "/api/aws/collections", {
      fetch,
      next: { revalidate: 0 },
    })
    .json();

  return <Client data={json.data} />;
}

export const dynamic = "force-dynamic";
