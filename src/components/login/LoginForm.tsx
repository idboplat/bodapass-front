"use client";
import DotsLoading from "@/components/common/loading/DotsLoading";
import ErrorModal from "@/components/common/modal/ErrorModal";
import { useApp } from "@/stores/app";
import { useSetModalStore } from "@/stores/modal";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "zustand";
import emailLoginFn from "@/apis/login";
import css from "./LoginForm.module.scss";
import { Button, PasswordInput, TextInput } from "@mantine/core";

const ID = "loginForm";

enum LoginInput {
  email = ID + "Email",
  pw = ID + "Pw",
}

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const modalStore = useSetModalStore();
  const store = useApp();
  const action = useStore(store, (store) => store.actions);

  const mutateEmailLogin = useMutation({
    mutationKey: ["emailLogin"],
    mutationFn: emailLoginFn,
    onMutate: () => setIsLoading(() => true),
    onSuccess: () => {
      // 로그인이 성공해도 화면이 전환될때까지 로딩처리
      action.login();
      router.replace("/");
    },
    onError: async (error) => {
      await modalStore.push(ErrorModal, { props: { error } });
      setIsLoading(() => false);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const email = e.target[LoginInput.email].value;
    const password = e.target[LoginInput.pw].value;

    if (mutateEmailLogin.isPending) return;
    mutateEmailLogin.mutate({ email, password });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.inputWrap}>
        <TextInput
          id={LoginInput.email}
          variant="underline"
          label="아이디"
          styles={(theme) => ({ input: { height: 40 } })}
        />
      </div>
      <div className={css.inputWrap}>
        <PasswordInput
          id={LoginInput.pw}
          variant="underline"
          label="비밀번호"
          styles={(theme) => ({ input: { height: 40 } })}
        />
      </div>
      <div className={css.btnBox}>
        <Button type="submit" disabled={isLoading} w="100%" h={40}>
          {isLoading ? <DotsLoading /> : "로그인"}
        </Button>
      </div>
    </form>
  );
}
