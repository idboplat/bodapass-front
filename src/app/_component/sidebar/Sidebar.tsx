"use client";
import { ClientPath } from "@web/(afterLogin)/_lib/getPage";
import SidebarLogoutBtn from "./SidebarLogoutBtn";
import SidebarMenuList from "./SidebarMenuList";
import { Session } from "next-auth";
import { AppShellNavbar, Center } from "@mantine/core";

interface SidebarProps {
  pathList: ClientPath[];
  session: Session;
}
export default function Sidebar({ pathList, session }: SidebarProps) {
  return (
    <AppShellNavbar p="xs">
      <SidebarMenuList pathList={pathList} session={session} />
      <Center>
        <SidebarLogoutBtn />
      </Center>
    </AppShellNavbar>
  );
}
