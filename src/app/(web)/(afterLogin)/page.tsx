import { getServerSessionWithOptions } from "@/libraries/nextAuth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSessionWithOptions();

  if (!session) return redirect("/login");

  const corpGrpTp = session.user.corpGrpTp;

  // 로그인 후 시작페이지 설정
  if (corpGrpTp === "G1") {
    redirect("/G1/100101");
  }
  if (corpGrpTp === "G2") {
    redirect("/G2/200101");
  }
  if (corpGrpTp === "G3") {
    redirect("/G3/200101");
  }
  if (corpGrpTp === "G4") {
    redirect("/G4/400201");
  }
}
