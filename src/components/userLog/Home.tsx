import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { userLogDto } from "@/types/dto";
import { notFound } from "next/navigation";

export default async function UserLog({ page, session, searchParams }: HomeProps) {
  const dto = userLogDto.safeParse(searchParams);

  if (dto.error) {
    console.error(dto.error);
    notFound();
  }

  console.log("userLogDto", dto);

  return <Client page={page} session={session} dto={dto.data} />;
}
