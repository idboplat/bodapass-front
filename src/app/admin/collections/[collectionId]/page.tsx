import { ListFacesCommandOutput } from "@aws-sdk/client-rekognition";
import Client from "./page.client";

type Props = {
  params: { collectionId: string };
};

export default async function Page({ params }: Props) {
  const collectionId = params.collectionId;
  console.log("collectionId", collectionId);
  const url = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
  const response = await fetch(`${url}/api/aws/collections/${collectionId}`, {
    next: { revalidate: 0 },
  });

  const json: { message: string; data: ListFacesCommandOutput } = await response.json();

  return <Client data={json.data} />;
}
