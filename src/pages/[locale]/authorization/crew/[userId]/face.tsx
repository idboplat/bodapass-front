import { faceDto } from "@/components/authorization/dto";
import FaceHome from "@/components/authorization/face-home";
import { DtoValidator } from "@/components/common/dto-validator";
import { Authorized } from "@/libraries/auth/authorized";
import { useRouter } from "next/router";

// http://localhost:3000/ko/authorization/crew/[userId]/face
export default function CrewFaceRegisterPage() {
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <Authorized>
      <DtoValidator dto={faceDto}>
        <FaceHome />
      </DtoValidator>
    </Authorized>
  );
}
