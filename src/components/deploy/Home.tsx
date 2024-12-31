import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { deployDto } from "@/types/dto";
import { notFound } from "next/navigation";

export default async function Deploy({ page, session, searchParams }: HomeProps) {
  const dto = deployDto.safeParse(searchParams);

  if (dto.error) {
    console.error(dto.error);
    notFound();
  }

  console.log("deployDto", dto);

  return <Client page={page} session={session} dto={dto.data} />;
}
