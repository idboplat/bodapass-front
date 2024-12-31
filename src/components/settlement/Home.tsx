import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { settlementDto } from "@/types/dto";
import { notFound } from "next/navigation";

export default async function Settlement({ page, session, searchParams }: HomeProps) {
  const dto = settlementDto.safeParse(searchParams);

  if (dto.error) {
    console.error(dto.error);
    notFound();
  }

  console.log("settlementDto", dto);
  return <Client page={page} session={session} dto={dto.data} />;
}
