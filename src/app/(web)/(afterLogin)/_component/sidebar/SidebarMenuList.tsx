import { HiMiniUserGroup } from "react-icons/hi2";
import { MdUnsubscribe } from "react-icons/md";
import SidebarMenuItem from "./SidebarMenuItem";

export default function SidebarMenuList() {
  return (
    <ul>
      <SidebarMenuItem svg={<HiMiniUserGroup />} text="회원정보" href="/user" />
      <SidebarMenuItem svg={<MdUnsubscribe />} text="구독정보" href="/subscribe" />
    </ul>
  );
}
