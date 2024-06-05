"use client";
import UnderLineInput from "@/app/_component/input/UnderLineInput";
import DotsLoading from "@/app/_component/loading/DotsLoading";
import ErrorModal from "@/app/_component/modal/ErrorModal";
import { useApp } from "@/app/_lib/app";
import { useSetModalStore } from "@/app/_lib/modalStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "zustand";
import emailLoginFn from "../_lib/login";
import * as style from "./loginForm.css";

const ID = "loginForm";

enum LoginInput {
  email = ID + "Email",
  pw = ID + "Pw",
}

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      case LoginInput.email:
        setEmail(() => value);
        break;
      case LoginInput.pw:
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
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.inputWrap}>
        <label className={style.label} htmlFor={LoginInput.email}>
          아이디
        </label>
        <UnderLineInput
          id={LoginInput.email}
          type="text"
          value={email}
          onChange={handleInput}
          onReset={() => setEmail("")}
        />
      </div>
      <div className={style.inputWrap}>
        <label className={style.label} htmlFor={LoginInput.pw}>
          비밀번호
        </label>
        <UnderLineInput
          id={LoginInput.pw}
          type="password"
          value={password}
          onChange={handleInput}
          onReset={() => setPassword("")}
        />
      </div>
      <div className={style.btnBox}>
        <button className={style.loginBtn} type="submit" disabled={isLoading}>
          {isLoading ? <DotsLoading /> : "로그인"}
        </button>
      </div>
    </form>
  );
}
