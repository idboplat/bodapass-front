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
import { checkPassword } from "@/utils/regexp";

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
    // mode: "onTouched", // 직접 검증 처리하기 위해 막음
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
      emailAddr: "",
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

    if (form.getValues("idNo1").length !== 6) {
      form.setError("idNo1", { message: "주민등록번호 앞 6자리를 입력해주세요." });
      return;
    }

    if (form.getValues("idNo2").length !== 7) {
      form.setError("idNo2", { message: "주민등록번호 뒤 7자리를 입력해주세요." });
      return;
    }

    setStep(() => 4);
  };

  const step4Prev = () => setStep(() => 3);

  const step4Submit = async () => {
    if (WCW000001SSP02.isLoading) return;

    // emailAddr 우선 빈값으로
    form.setValue("emailAddr", "");

    const isValid = await form.trigger();

    // if (!isValid) return;
    if (!isValid) {
      // 디버깅: 어떤 필드에서 에러가 발생했는지 확인
      const errors = form.formState.errors;
      const values = form.getValues();

      nativeLogger("=== Validation Errors ===");
      nativeLogger(JSON.stringify(errors, null, 2));
      nativeLogger("=== Form Values ===");
      nativeLogger(JSON.stringify(values, null, 2));

      alert(`Validation 실패\n에러 필드: ${Object.keys(errors).join(", ")}`);
      return;
    }

    // TODO : 리팩토링 필요
    if (!checkPassword(form.getValues("password"))) {
      form.setError("password", {
        message: "비밀번호는 8자 이상, 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.",
      });
      return;
    }

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
        emailAddr: "",
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
