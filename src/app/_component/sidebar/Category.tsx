import { ClientPath } from "@web/(afterLogin)/_lib/getPage";
import SidebarMenuItem from "./SidebarMenuItem";
import { useState } from "react";
import { Session } from "next-auth";
import { NavLink } from "@mantine/core";
import { category } from "./sidebar.css";

interface CategoryProps {
  session: Session;
  path: ClientPath;
}

export default function Category({ path, session }: CategoryProps) {
  const [isShow, setIsShow] = useState(true);

  const toggleShow = () => setIsShow((pre) => !pre);

  return (
    <NavLink
      label={path.category}
      classNames={{
        root: category,
      }}
      // className={classNames(category, module.category)}
      opened={isShow}
      onClick={toggleShow}
      childrenOffset="xs"
      active={isShow}
    >
      {path.pages.map((page) => {
        if ("category" in page) {
          return <Category key={page.category} path={page} session={session} />;
        } else {
          return (
            <SidebarMenuItem
              key={page.title}
              text={page.title}
              href={`/${session.user.corpGrpTp}/${page.number}`}
              session={session}
            />
          );
        }
      })}
    </NavLink>
  );
}
