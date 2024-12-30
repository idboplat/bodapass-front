import { getServerSessionWithOptions } from "@/libraries/nextAuth";
import { getPage } from "@/utils/getPage";
import { notFound, redirect } from "next/navigation";
// import { G4_PATH_LIST } from "./router";
import { Metadata } from "next";
import { getDefaultMetadata } from "@/utils/getDefaultMetadata";

interface PageProps {
  params: {
    page: string;
  };
}

// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   const page = getPage(G4_PATH_LIST, params.page);

//   if (!page) {
//     notFound();
//   }

//   return {
//     ...getDefaultMetadata(),
//     title: page.title,
//   };
// }

export default async function Page({ params }: PageProps) {
  const session = await getServerSessionWithOptions();
  // const page = getPage(G4_PATH_LIST, params.page);

  if (session?.user.corpGrpTp !== "G4") {
    redirect("/notAuthorized");
  }

  // if (!page) {
  //   notFound();
  // }

  // return page.Component && <page.Component page={page} session={session} />;
  return null;
}
