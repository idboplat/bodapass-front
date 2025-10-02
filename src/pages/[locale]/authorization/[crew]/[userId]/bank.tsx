import BankHome from "@/components/authorization/bank-home";
import { bankDto } from "@/components/authorization/dto";
import { DtoValidator } from "@/components/common/dto-validator";
import { useRouter } from "next/router";
import { Authorized } from "@/libraries/auth/authorized";

// http://localhost:3000/ko/authorization/[userId]/bank
export default function BankRegisterPage() {
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <Authorized>
      <DtoValidator dto={bankDto}>
        <BankHome />
      </DtoValidator>
    </Authorized>
  );
}
