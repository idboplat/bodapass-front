import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { b2cDto } from "@/types/dto";
import { notFound } from "next/navigation";

export default async function B2c({ page, session, searchParams }: HomeProps) {
  const dto = b2cDto.safeParse(searchParams);

  if (dto.error) {
    console.error(dto.error);
    notFound();
  }

  console.log("b2cDto", dto);

  return <Client page={page} session={session} dto={dto.data} />;
}
