import { getServerSessionWithOptions } from "@/libraries/nextAuth";
import { redirect } from "next/navigation";
import LoginForm from "@/components/login/LoginForm";
import css from "./page.module.scss";

export default async function Page() {
  const session = await getServerSessionWithOptions();
  if (session) redirect("/");

  return (
    <main className={css.main}>
      <div className={css.inner}>
        <h1 className={css.title}>로그인</h1>
        <LoginForm />
      </div>
    </main>
  );
}
