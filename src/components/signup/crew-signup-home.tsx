import { useState } from "react";
import css from "./crew-signup-home.module.scss";
import { useSession } from "@/libraries/auth/use-session";
import { useRouter } from "next/router";
import { nativeLogger, sendMessageToDevice } from "@/hooks/use-device-api";
import { DEVICE_API } from "@/types/common";
import { useWCW000001SSP02 } from "@/hooks/tms/use-auth";
import { signUpDto, TScannedResult } from "@/libraries/auth/auth.dto";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CrewStep1 from "./crew-step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";
import { LoadingOverlay } from "@mantine/core";
import { WithoutSignInLayout } from "./layout";

interface Props {}

export default function CrewSignUpHome({}: Props) {
  const router = useRouter();
  const locale = router.query.locale?.toString() || "ko";

  // 국가코드 일시적 생략
  const [step, setStep] = useState(2);
  const [image, setImage] = useState<Blob | null>(null);
  const [wrkTp, setWrkTp] = useState<"2" | "3">("2");

  const { data: session } = useSession();
  if (!session) throw new Error("FW401");

  const WCW000001SSP02 = useWCW000001SSP02();

  const form = useForm({
    // mode: "onTouched", // 직접 검증 처리하기 위해 막음
    resolver: zodResolver(signUpDto),
    defaultValues: {
      // step1
      cntryCd: "KR",

      // step2
      idTp: "1" as const,

      // step3
      userNm: "",
      idNo1: "",
      idNo2: "",
      zipCd: "",
      addr: "",
      addrDtil: "",
      tel: "",

      // 미사용 필드
      brkrId: session.userId,
      externalId: "",
      password: "",
      passwordConfirm: "",

      //
      emailAddr: "",
    },
  });

  const changeWrkTp = (wrkTp: "2" | "3") => {
    setWrkTp(() => wrkTp);
  };

  const step1Next = async () => {
    const isValid = await form.trigger(["cntryCd"]);
    if (!isValid) return;

    setStep(() => 2);
  };

  const step2Prev = () => setStep(() => 1);

  const step2Next = (args: TScannedResult) => {
    form.setValue("idTp", args.idTp);
    form.setValue("idNo1", args.id1);
    form.setValue("idNo2", args.id2);
    setImage(() => args.image);

    setStep(() => 3);
  };

  const step3Prev = () => setStep(() => 2);

  const step3Submit = async () => {
    if (WCW000001SSP02.isLoading) return;

    if (!image) {
      setStep(() => 2);
      return;
    }

    if (form.getValues("idNo1").length !== 6) {
      form.setError("idNo1", { message: "신분증 앞 6자리를 입력해주세요." });
      return;
    }

    if (form.getValues("idNo2").length !== 7) {
      form.setError("idNo2", { message: "신분증 뒤 7자리를 입력해주세요." });
      return;
    }

    nativeLogger(JSON.stringify(form.formState, null, 2));

    WCW000001SSP02.mutation.mutate(
      {
        ...form.getValues(),
        session,
        image,
        wrkTp,
        loginTp: "4", // 기타
        corpCd: "",
        emailAddr: "",
      },
      {
        onSuccess: (data) =>
          sendMessageToDevice({
            type: DEVICE_API.addWorker,
            payload: data satisfies { userId: string },
          }),
      },
    );
  };

  return (
    <WithoutSignInLayout title="팀원 추가">
      <FormProvider {...form}>
        <div className={css.form}>
          {step === 1 && (
            <CrewStep1
              onClickNext={step1Next}
              wrkTp={wrkTp}
              changeWrkTp={changeWrkTp}
              session={session}
            />
          )}
          {step === 2 && <Step2 onClickNext={step2Next} onClickPrev={step2Prev} />}
          {step === 3 && !!image && (
            <Step3 onClickNext={step3Submit} onClickPrev={step3Prev} image={image} isLastStep />
          )}

          <LoadingOverlay visible={WCW000001SSP02.isLoading} />
        </div>
      </FormProvider>
    </WithoutSignInLayout>
  );
}
