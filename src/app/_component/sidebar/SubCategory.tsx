import { ClientPath } from "@web/(afterLogin)/_lib/getPage";
import Accordion2 from "../accordion/Accordion2";
import SidebarMenuItem from "./SidebarMenuItem";
import { useState } from "react";

interface CategoryProps {
  corpTp: string;
  path: ClientPath;
}

export default function SubCategory({ path, corpTp }: CategoryProps) {
  const [isShow, setIsShow] = useState(true);

  const toggleShow = () => setIsShow((pre) => !pre);

  return (
    <Accordion2 title={path.category} isShow={isShow} onClick={toggleShow}>
      {path.pages.map((page) => {
        if ("category" in page) {
          return <SubCategory key={page.category} path={page} corpTp={corpTp} />;
        } else {
          return (
            <SidebarMenuItem
              key={page.title}
              text={page.title}
              href={`/${corpTp}/${page.number}`}
            />
          );
        }
      })}
    </Accordion2>
  );
}
