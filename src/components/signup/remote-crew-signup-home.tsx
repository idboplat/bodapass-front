import { useRouter } from "next/router";
import { LoadingOverlay } from "@mantine/core";
import css from "./remote-crew-signup-home.module.scss";
import { useFormContext } from "react-hook-form";
import { TScannedResult, TSignUpDto } from "@/libraries/auth/auth.dto";
import { nativeAlert, nativeLogger } from "@/hooks/use-device-api";
import { useWCW000001SSP02 } from "@/hooks/tms/use-auth";
import RemoteCrewStep2 from "./remote-crew-step-2";
import Step2 from "./step-2";
import Step3 from "./step-3";
import { WithSignInLayout } from "./layout";
import { SOCIAL_LOGIN_SESSION_STORAGE_KEY } from "@/constants";
import { useSignupCtx } from "./context-provider";

interface Props {}

// 비대면 팀원 회원가입 폼
export default function RemoteCrewSignupHome({}: Props) {
  const router = useRouter();

  const form = useFormContext<TSignUpDto>();
  const ctx = useSignupCtx();

  // 국가코드 일시적 생략

  const WCW000001SSP02 = useWCW000001SSP02();

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
      form.setError("idNo1", { message: "신분증 앞 6자리를 입력해주세요." });
      return;
    }

    if (form.getValues("idNo2").length !== 7) {
      form.setError("idNo2", { message: "신분증 뒤 7자리를 입력해주세요." });
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
      exterUserId:
        ctx.loginTp === "2"
          ? ctx.socialLoginSession?.exterUserId || ""
          : form.getValues("exterUserId"),
      password:
        ctx.loginTp === "2" ? ctx.socialLoginSession?.code || "" : form.getValues("password"),
      session: null,
      image: [ctx.images[0], ctx.images?.[1] || ""] as [Blob | string, Blob | string],
      wrkTp: ctx.wrkTp,
      loginTp: ctx.loginTp,
      corpCd: "",
      emailAddr: "",
      idTp: ctx.idTp,
      brkrId: ctx.brkrId,
    };

    // socialLoginSession 체크
    if (!payload.exterUserId || !payload.password) {
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
    <WithSignInLayout title={ctx.wrkTp === "2" ? "팀원" : "일용직"}>
      <div className={css.form}>
        {ctx.step === "2" && (
          <RemoteCrewStep2
            wrkTp={ctx.wrkTp}
            initialBrkrId={ctx.brkrId}
            locale={ctx.locale}
            loginTp={ctx.loginTp}
          />
        )}
        {ctx.step === "3" && (
          <Step2
            idTp={ctx.idTp}
            locale={ctx.locale}
            onClickNext={step3Next}
            onClickPrev={step3Prev}
          />
        )}
        {ctx.step === "4" && (
          <Step3
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
