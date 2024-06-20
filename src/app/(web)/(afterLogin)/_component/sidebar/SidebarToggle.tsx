"use client";
import { useSetApp } from "@/app/_lib/appStore";
import classNames from "classnames";
import { LuMenu } from "react-icons/lu";
import { btn, hoverBox, icon } from "./sidebarToggle.css";

export default function SidebarToggle() {
  const actions = useSetApp();

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
