import { Metadata } from "next";

export default function Notfound() {
  return (
    <section className="main">
      <h2>요청하신 페이지를 찾을 수 없습니다.</h2>
    </section>
  );
}

export const metadata: Metadata = {
  title: "404 | Not Found",
};
