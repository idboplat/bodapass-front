import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { userHistoryDto } from "@/types/dto";
import { notFound } from "next/navigation";

export default async function UserHistory({ page, session, searchParams }: HomeProps) {
  const dto = userHistoryDto.safeParse(searchParams);

  if (dto.error) {
    console.error(dto.error);
    notFound();
  }

  console.log("userHistory", dto);

  return <Client page={page} session={session} dto={dto.data} />;
}
