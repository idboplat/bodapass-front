"use client";

import LoginForm from "./_component/LoginForm";
import { Wrap, Inner, Title } from "./Login.style";

export default function Page() {
  return (
    <Wrap>
      <Inner>
        <Title>로그인</Title>
        <LoginForm />
      </Inner>
    </Wrap>
  );
}
