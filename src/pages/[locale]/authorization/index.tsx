import { idCardDto } from "@/components/authorization/dto";
import IdcardHome from "@/components/authorization/id-card-home";
import { DtoValidator } from "@/components/common/dto-validator";
import { useRouter } from "next/router";

// http://localhost:3000/ko/authorization?brkrId=123
export default function AuthorizationPage() {
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <DtoValidator dto={idCardDto}>
      <IdcardHome />
    </DtoValidator>
  );
}
