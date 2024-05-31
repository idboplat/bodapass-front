import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h2>세션이 만료되었습니다.</h2>
      <div>
        <Link href="/login">로그인 페이지로 이동</Link>
      </div>
    </div>
  );
}
