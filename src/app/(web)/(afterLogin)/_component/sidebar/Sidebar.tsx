import SidebarLogoutBtn from "./SidebarLogoutBtn";
import SidebarMenuList from "./SidebarMenuList";
import { logoutBox, sidebar } from "./sidebar.css";

export default function Sidebar() {
  return (
    <aside className={sidebar}>
      <SidebarMenuList />
      <div className={logoutBox}>
        <SidebarLogoutBtn />
      </div>
    </aside>
  );
}
