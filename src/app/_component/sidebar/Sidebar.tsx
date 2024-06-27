"use client";
import { useApp } from "@/app/_lib/appStore";
import classNames from "classnames";
import { useHotkeys } from "react-hotkeys-hook";
import { useStore } from "zustand";
import { layout } from "./sidebar.css";
import SidebarLogoutBtn from "./SidebarLogoutBtn";
import SidebarMenuList from "./SidebarMenuList";
import { logoutBox, sidebar } from "./sidebar.css";

export default function Sidebar() {
  const store = useApp();
  const isSidebarToggle = useStore(store, (store) => store.sidebar);
  const actions = useStore(store, (store) => store.actions);

  useHotkeys(`ctrl+\\`, () => actions.toggleSidebar());

  return (
    <div className={classNames(layout, isSidebarToggle && "show")}>
      <aside className={classNames(sidebar, isSidebarToggle && "show")}>
        <SidebarMenuList />
        <div className={logoutBox}>
          <SidebarLogoutBtn />
        </div>
      </aside>
    </div>
  );
}
