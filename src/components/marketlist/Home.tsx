import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { marketlistDto } from "@/types/dto";
import { notFound } from "next/navigation";

export default async function ScreenMarketList({ page, session, searchParams }: HomeProps) {
  const dto = marketlistDto.safeParse(searchParams);

  if (dto.error) {
    console.error(dto.error);
    notFound();
  }

  console.log("marketlistDto", dto);
  return <Client page={page} session={session} dto={dto.data} />;
}
