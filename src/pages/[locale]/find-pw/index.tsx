import { TCetRecvTp, TCetTp } from "@/hooks/tms/use-auth";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import FindPw from "./find-pw";
import ResetPw from "./reset-pw";
import Complete from "./complete";

export type TFindPwForm = {
  userId: string;
  userNm: string;
  idNo: string;
  telNo: string;
  cetTp: TCetTp;
  cetRecvTp: TCetRecvTp;
  cetNo: string;
  step: string;
  password: string;
  passwordConfirm: string;
};

export default function Page({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const step = router.query.step?.toString() || "1";
  const form = useForm<TFindPwForm>({
    defaultValues: {
      userId: "",
      userNm: "",
      idNo: "",
      telNo: "",
      cetTp: "21",
      cetRecvTp: "M",
      cetNo: "",
      step: "1",
      password: "",
      passwordConfirm: "",
    },
  });

  // step이 "2"가 아닐 때 password와 passwordConfirm 초기화
  useEffect(() => {
    if (step !== "2") {
      form.setValue("password", "");
      form.setValue("passwordConfirm", "");
    }
  }, [step, form]);

  return (
    <FormProvider {...form}>
      <div className={"mobileLayout"}>
        {step === "1" ? (
          <FindPw form={form} />
        ) : step === "2" ? (
          <ResetPw form={form} />
        ) : step === "3" ? (
          <Complete />
        ) : null}
      </div>
    </FormProvider>
  );
}
