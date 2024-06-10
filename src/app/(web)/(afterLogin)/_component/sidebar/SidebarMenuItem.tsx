"use client";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { menuItem } from "./sidebar.css";

interface SidebarMenuItemProps {
  svg: React.ReactNode;
  text: string;
  href: string;
}

export default function SidebarMenuItem({ svg, text, href }: SidebarMenuItemProps) {
  const path = usePathname();
  const isActive = path === href;

  return (
    <li className={classNames(menuItem, isActive && "active")}>
      <a href={href}>
        {svg}
        <span>{text}</span>
      </a>
    </li>
  );
}
