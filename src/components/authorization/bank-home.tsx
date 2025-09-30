import { useDto } from "@/hooks/use-dto";
import { useState } from "react";
import BankCamera from "./bank-camera";
import BankForm from "./bank-form";
import { TBankDto } from "./dto";

interface Props {}

export default function BankHome({}: Props) {
  const dto = useDto<TBankDto>();
  const [step, setStep] = useState<"camera" | "form">("camera");
  const [bankImageSrc, setBankImageSrc] = useState<Blob | null>(null);

  return (
    <div className={"mobileLayout"}>
      {step === "camera" ? (
        <BankCamera setStep={setStep} setBankImageSrc={setBankImageSrc} bankDto={dto} />
      ) : (
        <BankForm bankDto={dto} setStep={setStep} bankImageSrc={bankImageSrc} />
      )}
    </div>
  );
}
