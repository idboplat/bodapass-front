import { getServerSessionWithOptions } from "@/model/nextAuth";
import { getPage } from "@web/(afterLogin)/_lib/getPage";
import { notFound, redirect } from "next/navigation";
import { G2_PATH_LIST } from "@web/(afterLogin)/G2/[page]/router";

interface PageProps {
  params: {
    page: string;
  };
}

export default async function Page({ params }: PageProps) {
  const session = await getServerSessionWithOptions();
  const page = getPage(G2_PATH_LIST, params.page);

  if (session?.user.corpGrpTp !== "G3") {
    redirect("/notAuthorized");
  }

  if (!page) {
    notFound();
  }

  return <page.Component page={page} session={session} />;
}
