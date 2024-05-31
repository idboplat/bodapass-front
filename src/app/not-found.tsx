import { Metadata } from "next";
import Link from "next/link";

export default function Notfound() {
  return (
    <div>
      <h2>요청하신 페이지를 찾을 수 없습니다.</h2>
      <div>
        <Link href="/">홈으로 돌아가기</Link>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "404 | Not Found",
};
