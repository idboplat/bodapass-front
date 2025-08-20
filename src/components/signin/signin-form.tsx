import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { Box, Button, PasswordInput, TextInput } from "@mantine/core";
import css from "./signin-form.module.scss";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendMessageToDevice } from "@/hooks/use-device-api";
import { signInDto, TSignInDto } from "@/libraries/auth/auth.dto";
import { frontApi } from "@/apis/fetcher";
import { nativeLogger } from "@/apis/native-logger";

export default function SigninForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      externalId: "",
      password: "",
    },
    resolver: zodResolver(signInDto),
  });

  const mutateEmailLogin = useMutation({
    mutationFn: (dto: TSignInDto) =>
      frontApi
        .post<{ session: Session }>("api/auth/signin", {
          json: dto,
        })
        .json()
        .then((json) => json.session),
    onMutate: () => setIsLoading(() => true),
    onSuccess: async (data, variables) => {
      await sendMessageToDevice({
        type: "updateDeviceSession",
        payload: data,
      });
    },
    onError: async (error) => {
      alert(error.message);
      setIsLoading(() => false);
    },
  });

  const submit = (data: TSignInDto) => {
    nativeLogger(JSON.stringify(form.formState, null, 2));

    if (mutateEmailLogin.isPending) return;

    const trimmedExternalId = data.externalId.trim();
    const trimmedPassword = data.password.trim();

    if (!trimmedExternalId) {
      throw new Error("이메일을 입력해주세요.");
    }

    if (!trimmedPassword) {
      throw new Error("비밀번호를 입력해주세요.");
    }

    mutateEmailLogin.mutate({
      externalId: trimmedExternalId,
      password: trimmedPassword,
    });
  };

  return (
    <form className={css.form} onSubmit={form.handleSubmit(submit)}>
      <Controller
        control={form.control}
        name="externalId"
        render={({ field }) => <TextInput {...field} label="아이디" type="text" />}
      />

      <Controller
        control={form.control}
        name="password"
        render={({ field }) => <PasswordInput {...field} mt={28} label="비밀번호" />}
      />

      <Box mt={28} style={{ textAlign: "center" }}>
        <Button variant="filled" type="submit" loading={isLoading}>
          로그인
        </Button>
      </Box>
    </form>
  );
}
