import { useRouter } from "next/router";
import { Box, Button, LoadingOverlay, PasswordInput, TextInput } from "@mantine/core";
import css from "./signin-form.module.scss";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInDto, TSignInDto } from "@/libraries/auth/auth.dto";
import { nativeLogger } from "@/hooks/use-device-api";
import { useEmailLoginMutation } from "@/hooks/tms/use-auth";
import CustomButton from "../common/custom-button";
import LockIcon from "/public/assets/svg/lock.svg";
import UserIcon from "/public/assets/svg/login-person.svg";
import Link from "next/link";
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

  const { isLoading, mutation } = useEmailLoginMutation();

  const submit = (data: TSignInDto) => {
    nativeLogger(JSON.stringify(form.formState, null, 2));

    if (mutation.isPending) return;

    const trimmedExternalId = data.externalId.trim();
    const trimmedPassword = data.password.trim();

    if (!trimmedExternalId) {
      throw new Error("아이디를 입력해주세요.");
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
            type="text"
            placeholder="아이디 입력"
            leftSection={<UserIcon size={20} className={css.icon} />}
            leftSectionWidth={48}
            classNames={{
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
            placeholder="비밀번호 8자 이상+영문대소문자+숫자+특수문자"
            leftSection={<LockIcon size={20} className={css.icon} />}
            leftSectionWidth={48}
            classNames={{
              input: css["mantine-PasswordInput-input"],
            }}
          />
        )}
      />

      <Box mt={28} style={{ textAlign: "center" }}>
        <CustomButton fullWidth type="submit">
          로그인
        </CustomButton>
      </Box>

      <Box className={css.findLink}>
        {/* <Link href={`/${locale}/find-id`}>아이디 찾기</Link> |
        <Link href={`/${locale}/find-password`}>비밀번호 찾기</Link> | */}
        <Link href={`/${locale}/signup`}>회원가입</Link>
      </Box>

      <LoadingOverlay visible={isLoading} />
    </form>
  );
}
