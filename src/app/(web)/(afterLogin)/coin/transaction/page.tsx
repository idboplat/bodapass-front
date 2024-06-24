import Nav from "./_component/Nav";
import Table from "./_component/Table";
import { getServerSessionWithOptions } from "@/model/nextAuth";
import { redirect } from "next/navigation";
import { wrap, title } from "./page.css";

export default async function Page() {
  const session = await getServerSessionWithOptions();

  if (!session) return redirect("/login");
  return (
    <div className={wrap}>
      <div className={title}>20210 코인거래내역</div>
      <Nav />
      <Table />
    </div>
  );
}
