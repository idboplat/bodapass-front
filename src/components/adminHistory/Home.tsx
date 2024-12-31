import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { adminHistoryDto } from "@/types/dto";
import { notFound } from "next/navigation";

export default async function AdminHistory({ page, session, searchParams }: HomeProps) {
  const dto = adminHistoryDto.safeParse(searchParams);

  if (dto.error) {
    console.error(dto.error);
    notFound();
  }

  console.log("adminHistoryDto", dto);

  return <Client page={page} session={session} dto={dto.data} />;
}
