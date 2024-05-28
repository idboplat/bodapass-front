import { getServerSessionWithOptions } from "@/model/nextAuth";
import Home from "./page.client";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSessionWithOptions();
  if (!session) redirect("/login");
  return <Home session={session} />;
}
