import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { subAgentProfitDto } from "@/types/dto";
import { notFound } from "next/navigation";

export default async function SubAgentProfit({ page, session, searchParams }: HomeProps) {
  const dto = subAgentProfitDto.safeParse(searchParams);

  if (dto.error) {
    console.error(dto.error);
    notFound();
  }

  console.log("subAgentProfitDto", dto);
  return <Client page={page} session={session} dto={dto.data} />;
}
