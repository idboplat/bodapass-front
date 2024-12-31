import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { b2bConsignDto } from "@/types/dto";
import { notFound } from "next/navigation";

export default async function B2bConsign({ page, session, searchParams }: HomeProps) {
  const dto = b2bConsignDto.safeParse(searchParams);

  if (dto.error) {
    console.error(dto.error);
    notFound();
  }

  console.log("b2bConsignDto", dto);

  return <Client page={page} session={session} dto={dto.data} />;
}
