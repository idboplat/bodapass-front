import { ClientPath } from "@web/(afterLogin)/_lib/getPage";
import Category from "./Category";

interface SidebarMenuListProps {
  corpTp: string;
  pathList: ClientPath[];
}

export default function SidebarMenuList({ pathList, corpTp }: SidebarMenuListProps) {
  return (
    <ul>
      {pathList.map((path) => {
        return <Category key={path.category} path={path} corpTp={corpTp} />;
      })}
    </ul>
  );
}
