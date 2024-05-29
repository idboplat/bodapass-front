"use client";

import ErrorModal from "@/app/_component/ErrorModal";
import useModalStore from "@/hook/useModalStore";
import ResetButton from "@/app/(web)/_component/ResetButton";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import emailLoginFn from "../_lib/login";
import {
  Button,
  ButtonBox,
  Form,
  Input,
  InputBox,
  InputWrap,
  Label,
  Loading,
} from "./LoginForm.style";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const modalStore = useModalStore();

  const mutateEmailLogin = useMutation({
    mutationKey: ["emailLogin"],
    mutationFn: emailLoginFn,
    onMutate: () => setIsLoading(() => true),
    onSuccess: () => {
      // 로그인이 성공해도 화면이 전환될때까지 로딩처리
      router.replace("/");
    },
    onError: async (error) => {
      await modalStore.push(ErrorModal, {
        props: {
          error,
        },
      });
      setIsLoading(() => false);
    },
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    switch (id) {
      case "loginEmailInput":
        setEmail(() => value);
        break;
      case "loginPasswordInput":
        setPassword(() => value);
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mutateEmailLogin.isPending) return;
    mutateEmailLogin.mutate({ email, password });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputWrap>
        <Label htmlFor="loginEmailInput">아이디</Label>
        <InputBox>
          <Input id="loginEmailInput" type="text" value={email} onChange={handleInput} />
          <ResetButton isShow={email !== ""} onClick={() => setEmail("")} />
        </InputBox>
      </InputWrap>
      <InputWrap>
        <Label htmlFor="loginPasswordInput">비밀번호</Label>
        <InputBox>
          <Input id="loginPasswordInput" type="password" value={password} onChange={handleInput} />
          <ResetButton isShow={password !== ""} onClick={() => setPassword("")} />
        </InputBox>
      </InputWrap>
      <ButtonBox>
        <Button type="submit" disabled={isLoading}>
          {mutateEmailLogin.isPending ? <Loading /> : "로그인"}
        </Button>
      </ButtonBox>
    </Form>
  );
}
