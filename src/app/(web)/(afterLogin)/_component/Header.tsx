import { fixed, title, wrap } from "./header.css";
import SidebarToggle from "./sidebar/SidebarToggle";

export default function Header() {
  return (
    <header className={wrap}>
      <div className={fixed}>
        <SidebarToggle />
        <h1 className={title}>TPRO</h1>
      </div>
    </header>
  );
}
