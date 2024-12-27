import { getServerSessionWithOptions } from "@/libraries/nextAuth";
import { notFound, redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { G1_PATH_LIST } from "./G1/[page]/router";
import { G2_PATH_LIST } from "./G2/[page]/router";
import { G4_PATH_LIST } from "./G4/[page]/router";
import { Path, getClientPathList } from "@/utils/getPage";
import LayoutClient from "./layout.client";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSessionWithOptions();
  if (!session) redirect("/login");

  const pathMap: Record<string, Path[]> = {
    G1: G1_PATH_LIST,
    G2: G2_PATH_LIST,
    G3: G2_PATH_LIST, // G3는 G2와 동일한 페이지를 사용
    G4: G4_PATH_LIST,
  };

  if (!pathMap[session.user.corpGrpTp]) {
    notFound();
  }

  //컴포넌트를 제거하고 전달
  const clientPath = getClientPathList(pathMap[session.user.corpGrpTp]);

  return (
    <LayoutClient clientPath={clientPath} session={session}>
      {children}
    </LayoutClient>
  );
}
