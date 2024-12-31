import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { marketCurrenciesDto } from "@/types/dto";
import { notFound } from "next/navigation";

export default function MartketCurrencies({ page, session, searchParams }: HomeProps) {
  const dto = marketCurrenciesDto.safeParse(searchParams);

  if (dto.error) {
    console.error(dto.error);
    notFound();
  }

  console.log("marketCurrenciesDto", dto);
  return <Client page={page} session={session} dto={dto.data} />;
}
