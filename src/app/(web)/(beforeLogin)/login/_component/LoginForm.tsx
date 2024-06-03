"use client";
import ErrorModal from "@/app/_component/modal/ErrorModal";
import ResetButton from "@/app/_component/btn/ResetBtn";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import emailLoginFn from "../_lib/login";
import DotsLoading from "@/app/_component/loading/DotsLoading";
import * as style from "./loginForm.css";
import { useSetModalStore } from "@/app/_lib/modalStore";
import { useApp } from "@/app/_lib/app";
import { useStore } from "zustand";

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
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.inputWrap}>
        <label className={style.label} htmlFor="loginEmailInput">
          아이디
        </label>
        <div className={style.inputBox}>
          <input
            className={style.input}
            id="loginEmailInput"
            type="text"
            value={email}
            onChange={handleInput}
          />
          <ResetButton isShow={email !== ""} onClick={() => setEmail("")} />
        </div>
      </div>
      <div className={style.inputWrap}>
        <label className={style.label} htmlFor="loginPasswordInput">
          비밀번호
        </label>
        <div className={style.inputBox}>
          <input
            className={style.input}
            id="loginPasswordInput"
            type="password"
            value={password}
            onChange={handleInput}
          />
          <ResetButton isShow={password !== ""} onClick={() => setPassword("")} />
        </div>
      </div>
      <div className={style.btnBox}>
        <button className={style.loginBtn} type="submit" disabled={isLoading}>
          {isLoading ? <DotsLoading /> : "로그인"}
        </button>
      </div>
    </form>
  );
}
