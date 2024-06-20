"use client";
import UnderLineInput from "@/app/_component/input/UnderLineInput";
import DotsLoading from "@/app/_component/loading/DotsLoading";
import ErrorModal from "@/app/_component/modal/ErrorModal";
import { useApp } from "@/app/_lib/appStore";
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
  corpCode = ID + "CorpCode",
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
      await modalStore.push(ErrorModal, {
        props: {
          error,
        },
      });
      setIsLoading(() => false);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target[LoginInput.email].value;
    const password = e.target[LoginInput.pw].value;
    const corpCode = e.target[LoginInput.corpCode].value;

    if (mutateEmailLogin.isPending) return;
    mutateEmailLogin.mutate({ email, password, corpCode });
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.inputWrap}>
        <label className={style.label} htmlFor={LoginInput.corpCode}>
          회사코드
        </label>
        <UnderLineInput id={LoginInput.corpCode} type="text" />
      </div>
      <div className={style.inputWrap}>
        <label className={style.label} htmlFor={LoginInput.email}>
          아이디
        </label>
        <UnderLineInput id={LoginInput.email} type="text" />
      </div>
      <div className={style.inputWrap}>
        <label className={style.label} htmlFor={LoginInput.pw}>
          비밀번호
        </label>
        <UnderLineInput id={LoginInput.pw} type="password" />
      </div>
      <div className={style.btnBox}>
        <button className={style.loginBtn} type="submit" disabled={isLoading}>
          {isLoading ? <DotsLoading /> : "로그인"}
        </button>
      </div>
    </form>
  );
}
