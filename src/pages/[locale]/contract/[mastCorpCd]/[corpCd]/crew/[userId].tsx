import { DtoValidator } from "@/components/common/dto-validator";
import { contractDto } from "@/components/contract/dto";
import { CrewContractHome } from "@/components/contract/crew-home";
import { Authorized } from "@/libraries/auth/authorized";
import { useRouter } from "next/router";

export default function CrewContractPage() {
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <Authorized>
      <DtoValidator dto={contractDto}>
        <div className={"mobileLayout"}>
          <CrewContractHome />
        </div>
      </DtoValidator>
    </Authorized>
  );
}
