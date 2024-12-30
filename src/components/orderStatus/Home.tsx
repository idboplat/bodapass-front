import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { orderStatusDto } from "@/types/dto";
import { notFound } from "next/navigation";

export default async function OrderStatus({ page, session, searchParams }: HomeProps) {
  const dto = orderStatusDto.safeParse(searchParams);

  if (dto.error) {
    console.error(dto.error);
    notFound();
  }

  console.log("orderStatusDto", dto);

  return <Client page={page} session={session} dto={dto.data} />;
}
