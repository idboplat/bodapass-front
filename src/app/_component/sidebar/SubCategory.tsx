import { ClientPath } from "@web/(afterLogin)/_lib/getPage";
import Accordion2 from "../accordion/Accordion2";
import SidebarMenuItem from "./SidebarMenuItem";
import { useState } from "react";
import { Session } from "next-auth";

interface SubCategoryProps {
  session: Session;
  path: ClientPath;
}

export default function SubCategory({ path, session }: SubCategoryProps) {
  const [isShow, setIsShow] = useState(true);

  const toggleShow = () => setIsShow((pre) => !pre);

  return (
    <Accordion2 title={path.category} isShow={isShow} onClick={toggleShow}>
      {path.pages.map((page) => {
        if ("category" in page) {
          return <SubCategory key={page.category} path={page} session={session} />;
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
    </Accordion2>
  );
}
