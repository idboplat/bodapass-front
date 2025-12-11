import { useRouter } from "next/router";
import { useState } from "react";
import { LoadingOverlay } from "@mantine/core";
import css from "./remote-crew-signup-home.module.scss";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpDto, TScannedResult, TSignUpDto } from "@/libraries/auth/auth.dto";
import { nativeAlert, nativeLogger } from "@/hooks/use-device-api";
import { useTCM200001SSQ00, useWCW000001SSP02 } from "@/hooks/tms/use-auth";
import RemoteCrewStep1 from "./remote-crew-step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";
import Step4 from "./step-4";
import { WithSignInLayout } from "./layout";
import { checkPassword } from "@/utils/regexp";
import { SOCIAL_LOGIN_SESSION_STORAGE_KEY } from "@/constants";

interface Props {
  workerTp: "2" | "3";
  loginTp: "1" | "2" | "3" | "4" | "5";
  initState: {
    brokerId: TSignUpDto["brkrId"];
    externalId: TSignUpDto["externalId"];
    password: TSignUpDto["password"];
  };
}

// 비대면 팀원 회원가입 폼
export default function RemoteCrewSignupHome({ initState, workerTp, loginTp }: Props) {
  const router = useRouter();
  const asPath = router.asPath;
  const locale = router.query.locale?.toString() || "ko";

  const [isValidateBrokerId, setIsValidateBrokerId] = useState(false);
  // 국가코드 일시적 생략
  const [step, setStep] = useState(2);
  const [image, setImage] = useState<Blob | null>(null);

  const TCM200001SSQ00 = useTCM200001SSQ00();
  const WCW000001SSP02 = useWCW000001SSP02();

  const form = useForm({
    // mode: "onTouched", // 직접 검증 처리하기 위해 막음
    resolver: zodResolver(signUpDto),
    defaultValues: {
      // step1
      cntryCd: "KR",
      brkrId: initState.brokerId,

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

      //
      emailAddr: "",
    },
  });

  const step1Prev = () => {
    router.back();
  };

  const onClickBrokerInputButton = (brokerId: string) => {
    if (TCM200001SSQ00.isPending) return;

    if (!isValidateBrokerId) {
      TCM200001SSQ00.mutate(
        { brkrId: brokerId },
        {
          onSuccess: () => {
            form.clearErrors("brkrId");
            setIsValidateBrokerId(() => true);
          },
        },
      );
    } else {
      setIsValidateBrokerId(() => false);
    }
  };

  const toggleWorkerTp = () => {
    form.setValue("brkrId", "");
    form.clearErrors("brkrId");
    setIsValidateBrokerId(() => false);

    const [pathname, search] = asPath.split("?");
    const searchParams = new URLSearchParams(search);
    searchParams.set("workerTp", workerTp === "2" ? "3" : "2");
    const url = pathname + "?" + searchParams.toString();
    router.push(url);
  };

  const step1Next = async () => {
    if (workerTp === "2") {
      // 팀원의 경우
      const isValid = await form.trigger(["cntryCd", "brkrId"]);
      if (!isValid) return;

      if (form.getValues("brkrId").length > 0 && !isValidateBrokerId) {
        form.setError("brkrId", { message: "반장 아이디가 검증되지 않았습니다." });
        return;
      }
    }

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
      form.setError("idNo1", { message: "신분증 앞 6자리를 입력해주세요." });
      return;
    }

    if (form.getValues("idNo2").length !== 7) {
      form.setError("idNo2", { message: "신분증 뒤 7자리를 입력해주세요." });
      return;
    }

    setStep(() => 4);
  };

  const step4Prev = () => setStep(() => 3);

  const step4Submit = async () => {
    if (WCW000001SSP02.isLoading) return;

    const isValid = await form.trigger();
    if (!isValid) return;

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
        wrkTp: workerTp,
        loginTp,
        corpCd: "",
        emailAddr: "",
      },
      {
        onSuccess: () => {
          nativeAlert("회원가입이 완료되었습니다.");
          sessionStorage.removeItem(SOCIAL_LOGIN_SESSION_STORAGE_KEY);
          router.replace(`/${locale}/signin`);
        },
      },
    );
  };

  return (
    <WithSignInLayout title={workerTp === "2" ? "팀원" : "일용직"}>
      <FormProvider {...form}>
        <div className={css.form}>
          {step === 1 && (
            <RemoteCrewStep1
              workerTp={workerTp}
              isValidateBrokerId={isValidateBrokerId}
              isLoadingBrokerCheck={TCM200001SSQ00.isPending}
              onClickBrokerInputButton={onClickBrokerInputButton}
              onClickNext={step1Next}
              onClickPrev={step1Prev}
              toggleWorkerTp={toggleWorkerTp}
            />
          )}
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
