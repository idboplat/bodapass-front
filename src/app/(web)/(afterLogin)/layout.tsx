import { PropsWithChildren } from "react";
import Header from "./_component/header/Header";
import SidebarLayout from "./_component/sidebar/SidebarLayout";

// css 순서변경 금지
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "@/style/agCustomTheme.css";
import "@/style/datepicker.css";
import * as style from "./layout.css";
import Sidebar from "./_component/sidebar/Sidebar";

export default function Layout({ children }: PropsWithChildren) {
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
