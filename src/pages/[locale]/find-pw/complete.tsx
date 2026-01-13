import { useRouter } from "next/router";
import css from "./complete.module.scss";

export default function Complete() {
  const router = useRouter();
  const locale = router.query.locale?.toString() || "ko";

  return (
    <div className={css.wrap}>
      <div className={css.messageBox}>
        <p>비밀번호가 재설정되었습니다.</p>
        <p>로그인 후 이용해주세요.</p>
      </div>

      <div className={css.buttonBox}>
        <button onClick={() => router.push(`/${locale}/signin`)}>확인</button>
      </div>
    </div>
  );
}
