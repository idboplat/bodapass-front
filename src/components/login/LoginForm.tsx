import ErrorModal from "@/components/common/modal/ErrorModal";
import { useSetModalStore } from "@/stores/modal";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import emailLoginFn from "@/apis/login";
import { Box, Button, TextInput } from "@mantine/core";
import css from "./LoginForm.module.scss";
import EyeToggleButton from "../common/btn/eye-toggle-button";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendMessageToDevice } from "@/hooks/use-device-api";
import { logger } from "@/apis/logger";

const signInDto = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isHidePw, setIsHidePw] = useState(true);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInDto),
  });

  const modalStore = useSetModalStore();

  const mutateEmailLogin = useMutation({
    mutationKey: ["emailLogin"],
    mutationFn: emailLoginFn,
    onMutate: () => setIsLoading(() => true),
    onSuccess: async (data, variables) => {
      await sendMessageToDevice({
        type: "updateDeviceSession",
        payload: {
          session: {
            id: "id",
            email: variables.email,
            /** 로그인 종류 */
            provider: "email",
            sessionId: "1234567890",
            sessionKey: "1234567890",
            /** 로그인한 ISO-시간 */
            loginAt: new Date().toISOString(),
          },
        },
      });
    },
    onError: async (error) => {
      await modalStore.push(ErrorModal, { props: { error } });
      setIsLoading(() => false);
    },
  });

  const submit = (data: z.infer<typeof signInDto>) => {
    logger(JSON.stringify(form.formState, null, 2));

    if (mutateEmailLogin.isPending) return;
    mutateEmailLogin.mutate({
      email: data.email,
      password: data.password,
    });
  };

  const toggleHidePw = () => {
    setIsHidePw((prev) => !prev);
  };

  return (
    <form className={css.form} onSubmit={form.handleSubmit(submit)}>
      <Controller
        control={form.control}
        name="email"
        render={({ field }) => <TextInput {...field} label="아이디" type="text" />}
      />

      <Controller
        control={form.control}
        name="password"
        render={({ field }) => (
          <TextInput
            {...field}
            mt={28}
            label="비밀번호"
            type={isHidePw ? "password" : "text"}
            rightSection={<EyeToggleButton value={isHidePw} onClick={toggleHidePw} />}
          />
        )}
      />

      <Box mt={28} style={{ textAlign: "center" }}>
        <Button variant="filled" type="submit" loading={isLoading}>
          로그인
        </Button>
      </Box>
    </form>
  );
}
