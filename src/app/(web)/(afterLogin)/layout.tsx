// css 순서변경 금지
import "@/style/agGrid.css";
import "@/style/datepicker.css";
import * as style from "./layout.css";

import { PropsWithChildren } from "react";
import Header from "./_component/header/Header";
import SidebarLayout from "./_component/sidebar/SidebarLayout";
import Sidebar from "./_component/sidebar/Sidebar";

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className={style.col}>
      <Header />
      <div className={style.row}>
        <SidebarLayout>
          <Sidebar />
        </SidebarLayout>
        {children}
      </div>
    </div>
  );
}
