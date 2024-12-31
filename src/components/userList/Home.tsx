import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { userListDto } from "@/types/dto";
import { notFound } from "next/navigation";

export default async function UserList({ page, session, searchParams }: HomeProps) {
  const dto = userListDto.safeParse(searchParams);

  if (dto.error) {
    console.error(dto.error);
    notFound();
  }

  console.log("userListDto", dto);

  return <Client page={page} session={session} dto={dto.data} />;
}
