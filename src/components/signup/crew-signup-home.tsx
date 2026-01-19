import css from "./crew-signup-home.module.scss";
import { useSession } from "@/libraries/auth/use-session";
import { useRouter } from "next/router";
import { nativeLogger, sendMessageToDevice } from "@/hooks/use-device-api";
import { DEVICE_API } from "@/types/common";
import { useWCW000001SSP02 } from "@/hooks/tms/use-auth";
import { TScannedResult, TSignUpDto } from "@/libraries/auth/auth.dto";
import { useFormContext } from "react-hook-form";
import CrewStep4 from "./crew-step-4";
import Step2 from "./step-2";
import Step3 from "./step-3";
import { LoadingOverlay } from "@mantine/core";
import { WithoutSignInLayout } from "./layout";
import { useOnSiteSignupCtx } from "./context-provider";
import CrewStep1 from "./crew-step-1";

interface Props {}

export default function CrewSignUpHome({}: Props) {
  const router = useRouter();

  const form = useFormContext<TSignUpDto>();
  const ctx = useOnSiteSignupCtx();

  // 국가코드 일시적 생략

  const { data: session } = useSession();
  if (!session) throw new Error("FW401");

  const WCW000001SSP02 = useWCW000001SSP02();

  const step2Prev = () => {
    router.back();
  };

  const step2Next = (args: TScannedResult) => {
    form.setValue("userNm", args.userNm);
    form.setValue("idNo1", args.id1);
    form.setValue("idNo2", args.id2);
    ctx.saveImages([args.image]);

    const searchParams = new URLSearchParams(router.asPath.split("?")[1]);
    searchParams.set("idTp", args.idTp);
    searchParams.set("step", "3");
    router.push(`/${ctx.locale}/signup/crew/?${searchParams.toString()}`);
  };

  const step3Prev = () => {
    router.back();
  };

  const step3Next = async () => {
    if (WCW000001SSP02.isLoading) return;

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
      searchParams.set("step", "2");
      router.push(`/${ctx.locale}/signup/crew/?${searchParams.toString()}`);
      return;
    }

    const searchParams = new URLSearchParams(router.asPath.split("?")[1]);
    searchParams.set("step", "4");
    router.push(`/${ctx.locale}/signup/crew/?${searchParams.toString()}`);
  };

  const step4Prev = () => {
    router.back();
  };

  const step4Submit = async () => {
    if (WCW000001SSP02.isLoading) return;

    nativeLogger(JSON.stringify(form.formState, null, 2));

    const payload = {
      ...form.getValues(),
      session,
      image: [ctx.images[0], ctx.images?.[1] || ""] as [Blob | string, Blob | string],
      wrkTp: ctx.wrkTp,
      loginTp: ctx.loginTp, // 4: 기타
      corpCd: "",
      emailAddr: "",
      idTp: ctx.idTp,
      brkrId: session.userId, // 반장 아이디
    };

    WCW000001SSP02.mutation.mutate(payload, {
      onSuccess: (data) => {
        if (!!window.ReactNativeWebView) {
          sendMessageToDevice({
            type: DEVICE_API.addWorker,
            payload: data satisfies { userId: string },
          });
        } else {
          alert("팀원 추가가 완료되었습니다.");
        }
      },
    });
  };

  return (
    <WithoutSignInLayout>
      <div className={css.form}>
        {ctx.step === "1" && <CrewStep1 />}
        {ctx.step === "2" && (
          <Step2
            onClickNext={step2Next}
            onClickPrev={step2Prev}
            idTp={ctx.idTp}
            locale={ctx.locale}
          />
        )}
        {ctx.step === "3" && (
          <Step3
            onClickNext={step3Next}
            onClickPrev={step3Prev}
            images={ctx.images}
            isLastStep
            idTp={ctx.idTp}
          />
        )}
        {ctx.step === "4" && (
          <CrewStep4
            wrkTp={ctx.wrkTp}
            session={session}
            locale={ctx.locale}
            onClickNext={step4Submit}
            onClickPrev={step4Prev}
          />
        )}

        <LoadingOverlay visible={WCW000001SSP02.isLoading} />
      </div>
    </WithoutSignInLayout>
  );
}
