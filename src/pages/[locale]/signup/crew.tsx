import { useRouter } from "next/router";
import { Authorized } from "@/libraries/auth/authorized";
import CrewSignUpHome from "@/components/signup/crew-signup-home";

// 팀원 대면 회원가입 페이지
export default function CrewIdCardRegisterPage() {
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <Authorized>
      <CrewSignUpHome />
    </Authorized>
  );
}
