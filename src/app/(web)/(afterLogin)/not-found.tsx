import { Metadata } from "next";

export default function Notfound() {
  return (
    <div>
      <h2>요청하신 페이지를 찾을 수 없습니다.</h2>
    </div>
  );
}

export const metadata: Metadata = {
  title: "404 | Not Found",
};
