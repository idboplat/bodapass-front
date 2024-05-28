"use client";
import styled from "@emotion/styled";
import Link from "next/link";

const Wrap = styled.div``;

const Title = styled.h2``;

const Desc = styled.div``;

export default function NotfoundClient() {
  return (
    <Wrap>
      <Title>요청하신 페이지를 찾을 수 없습니다.</Title>
      <Desc>
        <Link href="/">홈으로 돌아가기</Link>
      </Desc>
    </Wrap>
  );
}
