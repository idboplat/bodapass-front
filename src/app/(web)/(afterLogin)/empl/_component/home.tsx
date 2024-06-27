import { getServerSessionWithOptions } from "@/model/nextAuth";
import { redirect } from "next/navigation";
import Nav from "./Nav";
import Table from "./Table";
import { title, wrap } from "./home.css";

export default async function Home() {
  const session = await getServerSessionWithOptions();

  if (!session) return redirect("/login");
  return (
    <div className={wrap}>
      <div className={title}>100202 관리자 관리</div>
      <Nav session={session} />
      <Table session={session} />
    </div>
  );
}
