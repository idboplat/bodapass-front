"use client";
import styled from "styled-components";
import UnderLineInput from "@/components/common/input/UnderLineInput";
import DotsLoading from "@/components/common/loading/DotsLoading";
import ErrorModal from "@/components/common/modal/ErrorModal";
import { useApp } from "@/stores/app";
import { useSetModalStore } from "@/stores/modal";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useStore } from "zustand";
import emailLoginFn from "@/apis/login";
//import css from "./LoginForm.module.scss";


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const InputWrap = styled.div`
  border: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Label = styled.label`
  width: 60px;
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoginBtn = styled.button`
  width: 100%;
  height: 36px;
  background-color: #339af0;
  padding: 7px 0px;
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  border-radius: 3px;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #1c7ed6;
  }

  &:disabled {
    opacity: 0.5;
  }
`;



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
    <Form onSubmit={handleSubmit}>
      <InputWrap>
        <Label htmlFor={LoginInput.email}>
          아이디
        </Label>
        <UnderLineInput id={LoginInput.email} type="text" />
      </InputWrap>

      <InputWrap>
        <Label htmlFor={LoginInput.pw}>
          비밀번호
        </Label>
        <UnderLineInput id={LoginInput.pw} type="password" />
      </InputWrap>

      <BtnBox>
        <LoginBtn type="submit" disabled={isLoading}>
          {isLoading ? <DotsLoading /> : "로그인"}
        </LoginBtn>
      </BtnBox>
    </Form>



    // <form className={css.form} onSubmit={handleSubmit}>
    //   <div className={css.inputWrap}>
    //     <label className={css.label} htmlFor={LoginInput.email}>
    //       아이디
    //     </label>
    //     <UnderLineInput id={LoginInput.email} type="text" />
    //   </div>
    //   <div className={css.inputWrap}>
    //     <label className={css.label} htmlFor={LoginInput.pw}>
    //       비밀번호
    //     </label>
    //     <UnderLineInput id={LoginInput.pw} type="password" />
    //   </div>
    //   <div className={css.btnBox}>
    //     <button className={css.loginBtn} type="submit" disabled={isLoading}>
    //       {isLoading ? <DotsLoading /> : "로그인"}
    //     </button>
    //   </div>
    // </form>
  );
}
