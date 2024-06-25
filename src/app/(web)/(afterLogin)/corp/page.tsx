import { getServerSessionWithOptions } from "@/model/nextAuth";
import { redirect } from "next/navigation";
import Nav from "./_component/Nav";
import Table from "./_component/Table";
import { title, wrap } from "./page.css";

export default async function Page() {
  const session = await getServerSessionWithOptions();

  if (!session) return redirect("/login");
  return (
    <div className={wrap}>
      <div className={title}>200100 회사관리</div>
      <Nav session={session} />
      <Table session={session} />
    </div>
  );
}
