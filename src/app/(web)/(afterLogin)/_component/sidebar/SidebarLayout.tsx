"use client";
import { useApp } from "@/app/_lib/app";
import classNames from "classnames";
import { useHotkeys } from "react-hotkeys-hook";
import { useStore } from "zustand";
import { layout } from "./sidebar.css";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const store = useApp();
  const isSidebarToggle = useStore(store, (store) => store.sidebar);
  const actions = useStore(store, (store) => store.actions);

  useHotkeys(`ctrl+\\`, () => actions.toggleSidebar());

  return (
    <div className={classNames(layout, isSidebarToggle && "show")}>
      {isSidebarToggle && children}
    </div>
  );
}
