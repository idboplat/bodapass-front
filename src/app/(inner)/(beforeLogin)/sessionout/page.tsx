"use client";
import styled from "@emotion/styled";
import Link from "next/link";

const Wrap = styled.div``;

const Title = styled.h2``;

const Desc = styled.div``;

export default function Page() {
  return (
    <Wrap>
      <Title>세션이 만료되었습니다.</Title>
      <Desc>
        <Link href="/login">로그인 페이지로 이동</Link>
      </Desc>
    </Wrap>
  );
}
