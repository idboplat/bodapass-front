import { TCetRecvTp, TCetTp } from "@/hooks/tms/use-auth";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import FindPw from "@/components/find-pw/find-pw";
import ResetPw from "@/components/find-pw/reset-pw";
import Complete from "@/components/find-pw/complete";

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

  return (
    <FormProvider {...form}>
      <div className={"mobileLayout"}>
        {step === "1" ? (
          <FindPw />
        ) : step === "2" ? (
          <ResetPw />
        ) : step === "3" ? (
          <Complete />
        ) : null}
      </div>
    </FormProvider>
  );
}
