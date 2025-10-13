import CrewFaceHome from "@/components/authorization/crew-face-home";
import { Authorized } from "@/libraries/auth/authorized";
import { useRouter } from "next/router";

// http://localhost:3000/ko/authorization/crew/[userId]/face
export default function CrewFaceRegisterPage() {
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <Authorized>
      <CrewFaceHome />
    </Authorized>
  );
}
