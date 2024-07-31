import { ClientPath } from "@web/(afterLogin)/_lib/getPage";
import Category from "./Category";
import { menuList } from "./sidebar.css";

interface SidebarMenuListProps {
  corpTp: string;
  pathList: ClientPath[];
}

export default function SidebarMenuList({ pathList, corpTp }: SidebarMenuListProps) {
  return (
    <ul className={menuList}>
      {pathList.map((path) => {
        return <Category key={path.category} path={path} corpTp={corpTp} />;
      })}
    </ul>
  );
}
