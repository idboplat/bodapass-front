import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { userlistDto } from "@/types/dto";
import { notFound } from "next/navigation";

interface UserListProps {}

export default async function UserList({ page, session, searchParams }: HomeProps<UserListProps>) {
  const dto = userlistDto.safeParse(searchParams);

  if (dto.error) {
    notFound();
  }

  return <Client page={page} session={session} dto={dto.data} />;
}
