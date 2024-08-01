import { ClientPath } from "@web/(afterLogin)/_lib/getPage";
import Category from "./Category";
import { menuList } from "./sidebar.css";
import { Session } from "next-auth";

interface SidebarMenuListProps {
  session: Session;
  pathList: ClientPath[];
}

export default function SidebarMenuList({ pathList, session }: SidebarMenuListProps) {
  return (
    <ul className={menuList}>
      {pathList.map((path) => {
        return <Category key={path.category} path={path} session={session} />;
      })}
    </ul>
  );
}
