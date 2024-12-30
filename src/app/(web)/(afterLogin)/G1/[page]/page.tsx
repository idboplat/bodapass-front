import { getServerSessionWithOptions } from "@/libraries/nextAuth";
import { getPage } from "@/utils/getPage";
import { notFound, redirect } from "next/navigation";
import { G1_PATH_LIST } from "./router";
import { Metadata } from "next";
import { getDefaultMetadata } from "@/utils/getDefaultMetadata";

interface PageProps {
  params: { page: string };
  searchParams: Record<string, string>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = getPage(G1_PATH_LIST, params.page);

  if (!page) {
    notFound();
  }

  return {
    ...getDefaultMetadata(),
    title: page.title,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const session = await getServerSessionWithOptions();
  const page = getPage(G1_PATH_LIST, params.page);

  if (session?.user.corpGrpTp !== "G1") {
    redirect("/notAuthorized");
  }

  if (!page) {
    notFound();
  }

  const { Home, ...clientProps } = page;

  return <Home page={clientProps} session={session} searchParams={searchParams} />;
}
