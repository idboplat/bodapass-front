import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { userlistDto } from "@/types/dto";
import { notFound } from "next/navigation";

export default async function Userlist({ page, session, searchParams }: HomeProps) {
  const dto = userlistDto.safeParse(searchParams);

  if (dto.error) {
    console.error(dto.error);
    notFound();
  }

  console.log("userlistDto", dto);

  return <Client page={page} session={session} dto={dto.data} />;
}
