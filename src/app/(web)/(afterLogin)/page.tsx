import { getServerSessionWithOptions } from "@/model/nextAuth";
import { redirect } from "next/navigation";
import Client from "./page.client";

export default async function Page() {
  const session = await getServerSessionWithOptions();

  if (!session) return redirect("/login");
  return (
    <div>
      <Client session={session} />
    </div>
  );
}
