"use client";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { menuItem } from "./sidebar.css";

interface SidebarMenuItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
}

export default function SidebarMenuItem({ icon, text, href }: SidebarMenuItemProps) {
  const path = usePathname();
  const isActive = path === href;

  return (
    <li className={classNames(menuItem, isActive && "active")}>
      <a href={href}>
        {icon}
        <span>{text}</span>
      </a>
    </li>
  );
}
