import { useRouter } from "next/router";
import { Box, PasswordInput, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInDto, TSignInDto } from "@/libraries/auth/auth.dto";
import CustomButton from "../common/custom-button";
import LockIcon from "/public/assets/svg/lock.svg";
import UserIcon from "/public/assets/svg/login-person.svg";
import Link from "next/link";
import css from "./signin-form.module.scss";

interface Props {
  onSubmit: (data: TSignInDto) => void;
  isLoading: boolean;
}

export default function SigninForm({ onSubmit, isLoading }: Props) {
  const router = useRouter();
  const locale = router.query.locale?.toString() || "ko";

  const form = useForm({
    defaultValues: {
      externalId: "",
      password: "",
    },
    resolver: zodResolver(signInDto),
  });

  return (
    <form className={css.form} onSubmit={form.handleSubmit(onSubmit)}>
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
        )}
      />

      <Box mt={28} style={{ textAlign: "center" }}>
        <CustomButton fullWidth type="submit" disabled={isLoading}>
          로그인
        </CustomButton>
      </Box>

      <Box className={css.findLink}>
        <Link href={`/${locale}/find-id`}>아이디 찾기</Link> |
        <Link href={`/${locale}/find-pw`}>비밀번호 찾기</Link> |
        <Link href={`/${locale}/signup`}>회원가입</Link>
      </Box>
    </form>
  );
}
