"use client";
import { useApp } from "@/app/_lib/app";
import classNames from "classnames";
import { LuMenu } from "react-icons/lu";
import { useStore } from "zustand";
import { btn, hoverBox, icon } from "./sidebarToggle.css";

export default function SidebarToggle() {
  const store = useApp();
  const actions = useStore(store, (store) => store.actions);
  return (
    <>
      <button className={btn} onClick={() => actions.toggleSidebar()}>
        <LuMenu className={icon} size={21} color="#666666" />
      </button>
      <div className={classNames(hoverBox, "hover")}>
        <p>사이드바 닫기</p> <span>ctrl + \</span>
      </div>
    </>
  );
}
