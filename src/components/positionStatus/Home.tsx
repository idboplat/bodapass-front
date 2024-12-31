import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { positionStatusDto } from "@/types/dto";
import { notFound } from "next/navigation";

interface PositionStatusProps {}

export default async function PositionStatus({
  page,
  session,
  searchParams,
}: HomeProps<PositionStatusProps>) {
  const dto = positionStatusDto.safeParse(searchParams);

  if (dto.error) {
    console.error(dto.error);
    notFound();
  }

  console.log("positionStatusDto", dto);
  return <Client page={page} session={session} dto={dto.data} />;
}
