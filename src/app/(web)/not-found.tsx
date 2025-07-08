"use client";
import { Button } from "@mantine/core";
import { Metadata } from "next";
import { useRouter } from "next/navigation";

export default function Notfound() {
  const router = useRouter();

  const onClickBack = () => {
    router.back();
  };

  return (
    <section className="main">
      <h2>요청하신 페이지를 찾을 수 없습니다.</h2>
      <div>
        <Button onClick={onClickBack} mx="auto" display="block">뒤로 돌아가기</Button>
      </div>
    </section>
  );
}

export const metadata: Metadata = {
  title: "404 | Not Found",
};
