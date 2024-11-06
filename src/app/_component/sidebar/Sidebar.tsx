"use client";
import { ClientPath } from "@web/(afterLogin)/_lib/getPage";
import SidebarLogoutBtn from "./SidebarLogoutBtn";
import { Session } from "next-auth";
import { AppShellNavbar, Center } from "@mantine/core";
import module from "./Sidebar.module.scss";
import Category from "./Category";

interface SidebarProps {
  pathList: ClientPath[];
  session: Session;
}
export default function Sidebar({ pathList, session }: SidebarProps) {
  return (
    <AppShellNavbar p="xs">
      <div className={module.categoryBox}>
        {pathList.map((path) => {
          return <Category key={path.category} path={path} session={session} />;
        })}
      </div>
      <div className={module.logoutBtnBox}>
        <SidebarLogoutBtn />
      </div>
    </AppShellNavbar>
  );
}
