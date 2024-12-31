import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { agentStatusDto } from "@/types/dto";
import { notFound } from "next/navigation";

export default async function AgentStatus({ page, session, searchParams }: HomeProps) {
  const dto = agentStatusDto.safeParse(searchParams);

  if (dto.error) {
    console.error(dto.error);
    notFound();
  }

  console.log("agentStatusDto", dto);

  return <Client page={page} session={session} dto={dto.data} />;
}
