import { fixed, title, wrap } from "./header.css";
import SidebarToggle from "../sidebar/SidebarToggle";
import dynamic from "next/dynamic";
import { getServerSessionWithOptions } from "@/model/nextAuth";
import { redirect } from "next/navigation";
import FiatButton from "./FiatButton";

const SessionTime = dynamic(() => import("./SessionTime"), { ssr: false });

export default async function Header() {
  const session = await getServerSessionWithOptions();

  if (!session) {
    redirect("/login");
  }

  return (
    <header className={wrap}>
      <div className={fixed}>
        <div>
          <SidebarToggle />
          <h1 className={title}>GLE Admin</h1>
        </div>
        <div>
          <SessionTime session={session} />
          <FiatButton />
        </div>
      </div>
    </header>
  );
}
