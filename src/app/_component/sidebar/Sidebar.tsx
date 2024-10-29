"use client";
import { useApp } from "@/app/_lib/appStore";
import { ClientPath } from "@web/(afterLogin)/_lib/getPage";
import classNames from "classnames";
import { useHotkeys } from "react-hotkeys-hook";
import { useStore } from "zustand";
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
    <AppShellNavbar p="sm">
      <SidebarMenuList pathList={pathList} session={session} />
      <Center>
        <SidebarLogoutBtn />
      </Center>
    </AppShellNavbar>
  );
}
