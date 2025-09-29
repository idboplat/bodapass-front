import { faceDto } from "@/components/authorization/dto";
import FaceHome from "@/components/authorization/face-home";
import { DtoValidator } from "@/components/common/dto-validator";
import { useRouter } from "next/router";

// http://localhost:3000/ko/authorization/[userId]/face
export default function FaceRegisterPage() {
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <DtoValidator dto={faceDto}>
      <FaceHome />
    </DtoValidator>
  );
}
