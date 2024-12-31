import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { b2bDto } from "@/types/dto";
import { notFound } from "next/navigation";

export default async function B2b({ page, session, searchParams }: HomeProps) {
  const dto = b2bDto.safeParse(searchParams);

  if (dto.error) {
    console.error(dto.error);
    notFound();
  }

  console.log("b2bDto", dto);

  return <Client page={page} session={session} dto={dto.data} />;
}
