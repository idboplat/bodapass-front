import { getServerSessionWithOptions } from "@/model/nextAuth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSessionWithOptions();

  if (!session) return redirect("/login");

  redirect("/G1/100101");
}
