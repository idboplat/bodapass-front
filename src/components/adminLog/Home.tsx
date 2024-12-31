import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { adminLogDto } from "@/types/dto";
import { notFound } from "next/navigation";

export default async function AdminLog({ page, session, searchParams }: HomeProps) {
  const dto = adminLogDto.safeParse(searchParams);

  if (dto.error) {
    console.error(dto.error);
    notFound();
  }

  console.log("adminLogDto", dto);

  return <Client page={page} session={session} dto={dto.data} />;
}
