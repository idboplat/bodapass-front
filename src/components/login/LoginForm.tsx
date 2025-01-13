"use client";
import ErrorModal from "@/components/common/modal/ErrorModal";
import { useApp } from "@/stores/app";
import { useSetModalStore } from "@/stores/modal";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useStore } from "zustand";
import emailLoginFn from "@/apis/login";
import { ActionIcon, Box, Button, CloseButton, TextInput } from "@mantine/core";
import css from "./LoginForm.module.scss";
import EyeToggleBtn from "../common/btn/EyeToggleBtn";


const ID = "loginForm";

enum LoginInput {
  email = ID + "Email",
  pw = ID + "Pw",
}

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isHidePw, setIsHidePw] = useState(true);

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

  const toggleHidePw = () => {
    setIsHidePw((prev) => !prev);
  };
  return (

    <form className={css.form} onSubmit={handleSubmit}>
      <TextInput variant="outline" label="아이디" id={LoginInput.email} type="text" />
      <TextInput
        mt={28}
        variant="outline"
        label="비밀번호"
        id={LoginInput.pw}
        type={isHidePw ? "password" : "text"}
        rightSection={<EyeToggleBtn value={isHidePw} onClick={toggleHidePw} />}
      />

      <Box mt={28} style={{ textAlign: "center" }}>
        <Button variant="filled" type="submit" disabled={isLoading} loading={isLoading}>
          로그인
        </Button>
      </Box>
    </form>
  );
}
