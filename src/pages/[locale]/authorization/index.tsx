import { idCardDto } from "@/components/authorization/dto";
import IdcardHome from "@/components/authorization/id-card-home";
import { DtoValidator } from "@/components/common/dto-validator";

// http://localhost:3000/ko/authorization?brkrId=123
export default function AuthorizationPage() {
  return (
    <DtoValidator dto={idCardDto}>
      <IdcardHome />
    </DtoValidator>
  );
}
