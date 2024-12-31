import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { tradeStatusDto } from "@/types/dto";
import { notFound } from "next/navigation";

interface TradeStatusProps {}

export default async function TradeStatus({
  page,
  session,
  searchParams,
}: HomeProps<TradeStatusProps>) {
  const dto = tradeStatusDto.safeParse(searchParams);

  if (dto.error) {
    console.error(dto.error);
    notFound();
  }

  console.log("tradeStatusDto", dto.data);
  return <Client page={page} session={session} dto={dto.data} />;
}
