"use client";
import { isSidebarToggleAtom } from "@/app/_lib/atom";
import classNames from "classnames";
import { useSetAtom } from "jotai";
import { LuMenu } from "react-icons/lu";
import { btn, hoverBox, icon } from "./sidebarToggle.css";

export default function SidebarToggle() {
  const setShow = useSetAtom(isSidebarToggleAtom);

  return (
    <>
      <button className={btn} onClick={() => setShow((prev) => !prev)}>
        <LuMenu className={icon} size={21} color="#666666" />
      </button>
      <div className={classNames(hoverBox, "hover")}>
        <p>사이드바 닫기</p> <span>ctrl + \</span>
      </div>
    </>
  );
}
