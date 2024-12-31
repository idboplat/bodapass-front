import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { marketTransactionDto } from "@/types/dto";
import { notFound } from "next/navigation";

export default function MarketTransaction({ page, session, searchParams }: HomeProps) {
  const dto = marketTransactionDto.safeParse(searchParams);

  if (dto.error) {
    console.error(dto.error);
    notFound();
  }

  console.log("marketTransactionDto", dto);
  return <Client page={page} session={session} dto={dto.data} />;
}
