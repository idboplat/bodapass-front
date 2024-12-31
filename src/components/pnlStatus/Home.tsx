import { HomeProps } from "@/types/common";
import Client from "./Home.client";
import { pnlStatusDto } from "@/types/dto";
import { notFound } from "next/navigation";

interface PnlStatusProps {}

export default async function PnlStatus({
  page,
  session,
  searchParams,
}: HomeProps<PnlStatusProps>) {
  const dto = pnlStatusDto.safeParse(searchParams);

  if (dto.error) {
    console.error(dto.error);
    notFound();
  }

  console.log("pnlStatusDto", dto);

  return <Client page={page} session={session} dto={dto.data} />;
}
