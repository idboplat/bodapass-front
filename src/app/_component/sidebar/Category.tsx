import { ClientPath } from "@web/(afterLogin)/_lib/getPage";
import Accordion from "../accordion/Accordion";
import SidebarMenuItem from "./SidebarMenuItem";
import { useState } from "react";

interface CategoryProps {
  corpTp: string;
  path: ClientPath;
}

export default function Category({ path, corpTp }: CategoryProps) {
  const [isShow, setIsShow] = useState(true);

  const toggleShow = () => setIsShow((pre) => !pre);

  return (
    <Accordion title={path.category} isShow={isShow} onClick={toggleShow}>
      {path.pages.map((page) => {
        return (
          <SidebarMenuItem
            key={page.number}
            icon={page.number}
            text={page.title}
            href={`/${corpTp}/${page.number}`}
          />
        );
      })}
    </Accordion>
  );
}
