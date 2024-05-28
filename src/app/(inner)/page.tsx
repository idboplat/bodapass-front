import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import authOptions from "@/model/nextAuth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session === null || session === undefined) {
    redirect("/login");
  }

  redirect("/user");
}
