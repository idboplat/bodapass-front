import { getServerSessionWithOptions } from "@/model/nextAuth";
import { redirect } from "next/navigation";
import LoginForm from "./_component/LoginForm";
import * as style from "./page.css";

export default async function Page() {
  const session = await getServerSessionWithOptions();
  if (session) return redirect("/");

  return (
    <main className={style.main}>
      <div className={style.inner}>
        <h1 className={style.title}>로그인</h1>
        <LoginForm />
      </div>
    </main>
  );
}
