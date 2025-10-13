import LeaderFaceHome from "@/components/authorization/leader-face-home";
import { Authorized } from "@/libraries/auth/authorized";
import { useRouter } from "next/router";

// http://localhost:3000/ko/authorization/leader/face
export default function LeaderFaceRegisterPage() {
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <Authorized>
      <LeaderFaceHome />
    </Authorized>
  );
}
