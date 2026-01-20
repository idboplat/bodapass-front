import { TCetRecvTp, TCetTp } from "@/hooks/tms/use-auth";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import FindId from "@/components/find-id/request-code";
import ResultId from "@/components/find-id/result-id";

export type TFindIdForm = {
  userId: string;
  userNm: string;
  idNo: string;
  telNo: string;
  cetTp: TCetTp;
  cetRecvTp: TCetRecvTp;
  cetNo: string;
};

export default function Page() {
  const router = useRouter();
  const step = router.query.step?.toString() || "1";
  const locale = router.query.locale?.toString() || "ko";

  const form = useForm<TFindIdForm>({
    defaultValues: {
      userId: "",
      userNm: "",
      idNo: "",
      telNo: "",
      cetTp: "02",
      cetRecvTp: "M",
      cetNo: "",
    },
  });

  return (
    <FormProvider {...form}>
      <div className={"mobileLayout"}>{step === "1" ? <FindId /> : <ResultId />}</div>
    </FormProvider>
  );
}
