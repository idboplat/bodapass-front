import { signIn } from "next-auth/react";

const emailLoginFn = async ({
  email,
  password,
  corpCode,
}: {
  email: string;
  password: string;
  corpCode: string;
}) => {
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();
  const trimmedCorpCode = corpCode.trim();

  if (!trimmedEmail) {
    throw new Error("이메일을 입력해주세요.");
  }

  if (!trimmedPassword) {
    throw new Error("비밀번호를 입력해주세요.");
  }

  // if (!trimmedCorpCode) {
  //   throw new Error("회사코드를 입력해주세요.");
  // }

  const result = await signIn("emailLogin", {
    email,
    password,
    // corpCode,
    // 에러메세지를 모달로 띄우기 위해 이동하지 않음
    redirect: false,
  });

  if (result?.error) {
    throw new Error(decodeURIComponent(result.error || "서비스 접근권한이 없습니다."));
  }
};

export default emailLoginFn;
