import { idCardDto } from "@/components/authorization/dto";
import IdcardHome from "@/components/authorization/id-card-home";
import { DtoValidator } from "@/components/common/dto-validator";
import { useRouter } from "next/router";
import { Authorized } from "@/libraries/auth/authorized";

// http://localhost:3000/ko/authorization/[brckId]/crew/id-card
export default function CrewIdCardRegisterPage() {
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <Authorized>
      <DtoValidator dto={idCardDto}>
        <IdcardHome />
      </DtoValidator>
    </Authorized>
  );
}
