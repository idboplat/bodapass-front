import { HomeProps } from "@/types/common";
import Client from "./Home.client";

export default async function Dashboard({ page, session }: HomeProps) {
  return <Client page={page} session={session} />;
}
