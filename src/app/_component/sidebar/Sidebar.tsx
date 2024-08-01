"use client";
import { useApp } from "@/app/_lib/appStore";
import { ClientPath } from "@web/(afterLogin)/_lib/getPage";
import classNames from "classnames";
import { useHotkeys } from "react-hotkeys-hook";
import { useStore } from "zustand";
import SidebarLogoutBtn from "./SidebarLogoutBtn";
import SidebarMenuList from "./SidebarMenuList";
import { layout, logoutBox, sidebar } from "./sidebar.css";
import { Session } from "next-auth";

interface SidebarProps {
  pathList: ClientPath[];
  session: Session;
}
export default function Sidebar({ pathList, session }: SidebarProps) {
  const store = useApp();
  const isSidebarToggle = useStore(store, (store) => store.sidebar);
  const actions = useStore(store, (store) => store.actions);

  useHotkeys(`ctrl+\\`, () => actions.toggleSidebar());

  return (
    <div className={classNames(layout, isSidebarToggle && "show")}>
      <aside className={classNames(sidebar, isSidebarToggle && "show")}>
        <SidebarMenuList pathList={pathList} session={session} />
        <div className={logoutBox}>
          <SidebarLogoutBtn />
        </div>
      </aside>
    </div>
  );
}
