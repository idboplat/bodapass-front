import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { agentProfitDto } from "@/types/dto";
import { notFound } from "next/navigation";

export default async function AgentProfit({ page, session, searchParams }: HomeProps) {
  const dto = agentProfitDto.safeParse(searchParams);

  if (dto.error) {
    console.error(dto.error);
    notFound();
  }

  console.log("agentProfitDto", dto);
  return <Client page={page} session={session} dto={dto.data} />;
}
