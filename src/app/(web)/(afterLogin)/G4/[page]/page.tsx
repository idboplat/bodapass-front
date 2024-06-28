import { getServerSessionWithOptions } from "@/model/nextAuth";
import { getPage } from "@web/(afterLogin)/_lib/getPage";
import { redirect } from "next/navigation";
import { G4_PATH_LIST } from "./router";

interface PageProps {
  params: {
    page: string;
  };
}

export default async function Page({ params }: PageProps) {
  const session = await getServerSessionWithOptions();
  const page = getPage(G4_PATH_LIST, params.page);

  if (session?.user.corpGrpTp !== "G4" || !page) {
    redirect("/notAuthorized");
  }

  return <page.Component page={page} session={session} />;
}
