// css 순서변경 금지
import "@/style/agGrid.css";
import "@/style/datepicker.css";
import * as style from "./layout.css";

import { PropsWithChildren } from "react";
import Sidebar from "@/app/_component/sidebar/Sidebar";
import Header from "@/app/_component/header/Header";
import { getServerSessionWithOptions } from "@/model/nextAuth";
import { redirect } from "next/navigation";
import { G1_PATH_LIST } from "./G1/[page]/router";
import { getClientPathList } from "./_lib/getPage";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSessionWithOptions();
  if (!session) redirect("/login");

  //컴포넌트를 제거하고 전달
  const clientPath = getClientPathList(G1_PATH_LIST);

  return (
    <div className={style.col}>
      <Header />
      <div className={style.row}>
        <Sidebar pathList={clientPath} session={session} />
        {children}
      </div>
    </div>
  );
}
