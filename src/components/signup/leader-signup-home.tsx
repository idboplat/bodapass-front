import { useWCW000001SSP02 } from "@/hooks/tms/use-auth";
import { nativeAlert, nativeLogger } from "@/hooks/use-device-api";
import { TScannedResult, TSignUpDto, signUpDto } from "@/libraries/auth/auth.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingOverlay } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import css from "./leader-signup-home.module.scss";
import LeaderStep1 from "./leader-step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";
import Step4 from "./step-4";
import { WithSignInLayout } from "./layout";

interface Props {
  loginTp: "1" | "2" | "3" | "4" | "5";
  initState: {
    externalId: TSignUpDto["externalId"];
    password: TSignUpDto["password"];
  };
}

export default function LeaderSignupHome({ loginTp, initState }: Props) {
  const router = useRouter();
  const { t } = useTranslation();
  const locale = router.query.locale?.toString() || "ko";

  // 국가코드 일시적 생략
  const [step, setStep] = useState(2);
  const [image, setImage] = useState<Blob | null>(null);

  const WCW000001SSP02 = useWCW000001SSP02();

  const form = useForm({
    mode: "onTouched", // 초기 로딩 시 불필요한 검증 방지
    resolver: zodResolver(signUpDto),
    defaultValues: {
      // step1
      cntryCd: "KR",
      brkrId: "",

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

      // step4
      externalId: initState.externalId,
      password: initState.password,
      passwordConfirm: initState.password,

      //
      corpCd: "",
    },
  });

  const step1Prev = () => {
    router.back();
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

  const step3Next = async () => {
    const isValid = await form.trigger([
      "idNo1",
      "idNo2",
      "userNm",
      "zipCd",
      "addr",
      "addrDtil",
      "tel",
    ]);

    if (!isValid) return;

    setStep(() => 4);
  };

  const step4Prev = () => setStep(() => 3);

  const step4Submit = async () => {
    if (WCW000001SSP02.isLoading) return;

    const isValid = await form.trigger();
    if (!isValid) return;

    if (form.getValues("password") !== form.getValues("passwordConfirm")) {
      form.setError("passwordConfirm", { message: "비밀번호가 일치하지 않습니다." });
      return;
    }

    if (!image) {
      setStep(() => 2);
      return;
    }

    nativeLogger(JSON.stringify(form.formState, null, 2));

    WCW000001SSP02.mutation.mutate(
      {
        ...form.getValues(),
        session: null,
        image,
        brkrId: "",
        wrkTp: "1",
        loginTp,
        corpCd: "",
      },
      {
        onSuccess: () => {
          nativeAlert("회원가입이 완료되었습니다.");
          router.replace(`/${locale}/signin`);
        },
      },
    );
  };

  return (
    <WithSignInLayout title="반장 회원가입">
      <FormProvider {...form}>
        <div className={css.form}>
          {step === 1 && <LeaderStep1 onClickNext={step1Next} onClickPrev={step1Prev} />}
          {step === 2 && <Step2 onClickNext={step2Next} onClickPrev={step2Prev} />}
          {step === 3 && !!image && (
            <Step3 onClickNext={step3Next} onClickPrev={step3Prev} image={image} />
          )}
          {step === 4 && (
            <Step4 onClickNext={step4Submit} onClickPrev={step4Prev} loginTp={loginTp} />
          )}

          <LoadingOverlay visible={WCW000001SSP02.isLoading} />
        </div>
      </FormProvider>
    </WithSignInLayout>
  );
}
