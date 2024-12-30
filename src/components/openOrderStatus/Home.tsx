import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { openOrderStatusDto } from "@/types/dto";
import { notFound } from "next/navigation";

export default function OpenOrderStatus({ page, session, searchParams }: HomeProps) {
  const dto = openOrderStatusDto.safeParse(searchParams);

  if (dto.error) {
    console.error(dto.error);
    notFound();
  }

  console.log("openOrderDto", dto.data);
  return <Client page={page} session={session} dto={dto.data} />;
}
