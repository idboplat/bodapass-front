import { useWCW000001SSP02 } from "@/hooks/tms/use-auth";
import { nativeAlert, nativeLogger } from "@/hooks/use-device-api";
import { TScannedResult, TSignUpDto } from "@/libraries/auth/auth.dto";
import { LoadingOverlay } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import css from "./leader-signup-home.module.scss";
import LeaderStep2 from "./leader-step-2";
import Step3 from "./step-3";
import Step4 from "./step-4";
import { WithSignInLayout } from "./layout";
import { checkPassword } from "@/utils/regexp";
import { SOCIAL_LOGIN_SESSION_STORAGE_KEY } from "@/constants";
import { TIdTp, TLoginTp, TWrkTp } from "@/types/common";
import { useSignupCtx } from "./context";

interface Props {}

export default function LeaderSignupHome({}: Props) {
  const router = useRouter();
  const { t } = useTranslation();

  const form = useFormContext<TSignUpDto>();
  const ctx = useSignupCtx();

  // 국가코드 일시적 생략

  const WCW000001SSP02 = useWCW000001SSP02();

  const step2Prev = () => {
    router.back();
  };

  const step2Next = async () => {
    const isValid = await form.trigger(["cntryCd", "zipCd", "addr", "addrDtil", "tel"]);
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

    const searchParams = new URLSearchParams(router.asPath.split("?")[1]);
    searchParams.set("step", "3");
    router.push(`/${ctx.locale}/signup/?${searchParams.toString()}`);
  };

  const step3Prev = () => {
    router.back();
  };

  const step3Next = (args: TScannedResult) => {
    form.setValue("idNo1", args.id1);
    form.setValue("idNo2", args.id2);
    ctx.saveImages([args.image]);

    const searchParams = new URLSearchParams(router.asPath.split("?")[1]);
    searchParams.set("idTp", args.idTp);
    searchParams.set("step", "4");
    router.push(`/${ctx.locale}/signup/?${searchParams.toString()}`);
  };

  const step4Prev = () => {
    router.back();
  };

  const step4Submit = async () => {
    if (WCW000001SSP02.isLoading) return;

    const isValid = await form.trigger(["userNm", "idNo1", "idNo2"]);

    if (!isValid) return;

    if (form.getValues("idNo1").length !== 6) {
      form.setError("idNo1", { message: "주민등록번호 앞 6자리를 입력해주세요." });
      return;
    }

    if (form.getValues("idNo2").length !== 7) {
      form.setError("idNo2", { message: "주민등록번호 뒤 7자리를 입력해주세요." });
      return;
    }

    if (ctx.images.length === 0) {
      const searchParams = new URLSearchParams(router.asPath.split("?")[1]);
      searchParams.set("step", "3");
      router.push(`/${ctx.locale}/signup/?${searchParams.toString()}`);
      return;
    }

    nativeLogger(JSON.stringify(form.formState, null, 2));

    const payload = {
      ...form.getValues(),
      externalId:
        ctx.loginTp === "2"
          ? form.getValues("externalId")
          : ctx.socialLoginSession?.externalId || "",
      password:
        ctx.loginTp === "2" ? form.getValues("password") : ctx.socialLoginSession?.code || "",
      session: null,
      image: ctx.images[0],
      wrkTp: "1" as TWrkTp,
      loginTp: ctx.loginTp,
      corpCd: "",
      emailAddr: "",
      idTp: ctx.idTp,
      brkrId: "",
    };

    // socialLoginSession 체크
    if (!payload.externalId || !payload.password) {
      sessionStorage.removeItem(SOCIAL_LOGIN_SESSION_STORAGE_KEY);
      nativeAlert("[F999] 비정상적인 접근입니다.");
      router.replace(`/${ctx.locale}/signin`);
      return;
    }

    WCW000001SSP02.mutation.mutate(payload, {
      onSuccess: () => {
        nativeAlert("회원가입이 완료되었습니다.");
        sessionStorage.removeItem(SOCIAL_LOGIN_SESSION_STORAGE_KEY);
        router.replace(`/${ctx.locale}/signin`);
      },
    });
  };

  return (
    <WithSignInLayout title="반장 회원가입">
      <div className={css.form}>
        {ctx.step === "2" && (
          <LeaderStep2 loginTp={ctx.loginTp} onClickNext={step2Next} onClickPrev={step2Prev} />
        )}
        {ctx.step === "3" && (
          <Step3
            idTp={ctx.idTp}
            locale={ctx.locale}
            onClickNext={step3Next}
            onClickPrev={step3Prev}
          />
        )}
        {ctx.step === "4" && (
          <Step4
            idTp={ctx.idTp}
            onClickNext={step4Submit}
            onClickPrev={step4Prev}
            images={ctx.images}
          />
        )}

        <LoadingOverlay visible={WCW000001SSP02.isLoading} />
      </div>
    </WithSignInLayout>
  );
}
