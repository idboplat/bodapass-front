import { ListFacesCommandOutput } from "@aws-sdk/client-rekognition";
import Client from "./page.client";
import ky from "ky";

type Props = {
  params: Promise<{ collectionId: string }>;
};

export default async function Page(props: Props) {
  const params = await props.params;
  const collectionId = params.collectionId;
  console.log("collectionId", collectionId);
  const url = process.env.NEXT_PUBLIC_FRONT_URL;

  const json = await ky
    .get<{ message: string; data: ListFacesCommandOutput }>(
      `${url}/api/aws/collections/${collectionId}`,
      {
        fetch,
        next: { revalidate: 0 },
      },
    )
    .json();

  return <Client data={json.data} />;
}
