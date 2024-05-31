"use client";
import { isSidebarToggleAtom } from "@/app/_lib/atom";
import { useAtom } from "jotai";
import { layout } from "./sidebar.css";
import { useHotkeys } from "react-hotkeys-hook";
import classNames from "classnames";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const [isShow, setShow] = useAtom(isSidebarToggleAtom);

  useHotkeys(`ctrl+\\`, () => setShow((prev) => !prev));

  return <div className={classNames(layout, isShow && "show")}>{isShow && children}</div>;
}
