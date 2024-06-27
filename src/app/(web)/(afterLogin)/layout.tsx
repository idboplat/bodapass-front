// css 순서변경 금지
import "@/style/agGrid.css";
import "@/style/datepicker.css";
import * as style from "./layout.css";

import { PropsWithChildren } from "react";

import Sidebar from "@/app/_component/sidebar/Sidebar";
import Header from "@/app/_component/header/Header";

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className={style.col}>
      <Header />
      <div className={style.row}>
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
