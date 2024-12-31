import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { adminListDto } from "@/types/dto";
import { notFound } from "next/navigation";

export default async function AdminList({ page, session, searchParams }: HomeProps) {
  const dto = adminListDto.safeParse(searchParams);

  if (dto.error) {
    console.error(dto.error);
    notFound();
  }

  console.log("adminListDto", dto);

  return <Client page={page} session={session} dto={dto.data} />;
}
