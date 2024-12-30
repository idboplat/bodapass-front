import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { adminlistDto } from "@/types/dto";
import { notFound } from "next/navigation";

export default async function Adminlist({ page, session, searchParams }: HomeProps) {
  const dto = adminlistDto.safeParse(searchParams);

  if (dto.error) {
    notFound();
  }

  return <Client page={page} session={session} dto={dto.data} />;
}
