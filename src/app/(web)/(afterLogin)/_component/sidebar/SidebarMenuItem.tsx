"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
      <Link href={href}>
        {svg}
        <span>{text}</span>
      </Link>
    </li>
  );
}
