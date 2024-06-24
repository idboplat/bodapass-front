import { fixed, title, wrap } from "./header.css";
import SidebarToggle from "../sidebar/SidebarToggle";
import dynamic from "next/dynamic";
import { getServerSessionWithOptions } from "@/model/nextAuth";
import { redirect } from "next/navigation";

const SessionTime = dynamic(() => import("./SessionTime"), { ssr: false });

export default async function Header() {
  // const session = await getServerSessionWithOptions();
  // console.log("session", session);

  // if (!session) {
  //   redirect("/login");
  // }

  return (
    <header className={wrap}>
      <div className={fixed}>
        <div>
          <SidebarToggle />
          <h1 className={title}>Admin Demo</h1>
        </div>
        <div>{/* <SessionTime session={session} /> */}</div>
      </div>
    </header>
  );
}
