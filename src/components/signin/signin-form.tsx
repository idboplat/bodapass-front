import { useRouter } from "next/router";
import { Box, Button, LoadingOverlay, PasswordInput, TextInput } from "@mantine/core";
import css from "./signin-form.module.scss";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInDto, TSignInDto } from "@/libraries/auth/auth.dto";
import { nativeLogger } from "@/hooks/use-device-api";
import { useEmailLoginMutation } from "@/hooks/tms/use-auth";

export default function SigninForm() {
  const router = useRouter();
  const locale = router.query.locale?.toString() || "ko";

  const form = useForm({
    defaultValues: {
      externalId: "",
      password: "",
    },
    resolver: zodResolver(signInDto),
  });

  const { isLoading, mutation } = useEmailLoginMutation({ locale });

  const submit = (data: TSignInDto) => {
    nativeLogger(JSON.stringify(form.formState, null, 2));

    if (mutation.isPending) return;

    const trimmedExternalId = data.externalId.trim();
    const trimmedPassword = data.password.trim();

    if (!trimmedExternalId) {
      throw new Error("이메일을 입력해주세요.");
    }

    if (!trimmedPassword) {
      throw new Error("비밀번호를 입력해주세요.");
    }

    mutation.mutate({
      externalId: trimmedExternalId,
      password: trimmedPassword,
    });
  };

  return (
    <form className={css.form} onSubmit={form.handleSubmit(submit)}>
      <Controller
        control={form.control}
        name="externalId"
        render={({ field }) => (
          <TextInput
            {...field}
            label="아이디"
            type="text"
            classNames={{
              label: css["mantine-TextInput-label"],
              input: css["mantine-TextInput-input"],
            }}
          />
        )}
      />

      <Controller
        control={form.control}
        name="password"
        render={({ field }) => (
          <PasswordInput
            {...field}
            mt={28}
            label="비밀번호"
            classNames={{
              label: css["mantine-PasswordInput-label"],
              input: css["mantine-PasswordInput-input"],
            }}
          />
        )}
      />

      <Box mt={28} style={{ textAlign: "center" }}>
        <Button className={css.loginButton} variant="filled" type="submit" loading={isLoading}>
          로그인
        </Button>
      </Box>

      <LoadingOverlay visible={isLoading} />
    </form>
  );
}
