import { getServerSessionWithOptions } from "@/model/nextAuth";
import { redirect } from "next/navigation";
import Nav from "./_component/Nav";
import Table from "./_component/Table";
import { wrap } from "./page.css";

export default async function Page() {
  const session = await getServerSessionWithOptions();

  if (!session) return redirect("/login");
  return (
    <div className={wrap}>
      <Nav />
      <Table />
    </div>
  );
}
