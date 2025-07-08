import LoginForm from "@/components/login/LoginForm";
import css from "./page.module.scss";

const redirect_uri = `${process.env.NEXT_PUBLIC_FRONT_URL}/api/auth/callback/kakao`;

export default async function Page() {

  return (
    <main className={css.main}>
      <div className={css.inner}>
        <h1 className={css.title}>로그인</h1>
        <LoginForm />
      </div>

      <div>
        <div>Kakao</div>
        <div>
          <a href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${encodeURIComponent(redirect_uri)}&prompt=select_account`}>로그인</a>
        </div>
      </div>
    </main>
  );
}
