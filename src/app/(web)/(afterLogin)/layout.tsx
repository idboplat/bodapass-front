import { getServerSessionWithOptions } from "@/libraries/nextAuth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  // const session = await getServerSessionWithOptions();
  // if (!session) redirect("/login");

  return <>{children}</>;
}
