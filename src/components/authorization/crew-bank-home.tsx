import { useState } from "react";
import BankCamera from "./bank-camera";
import BankForm from "./bank-form";
import { useRouter } from "next/router";
import { useWCW000002SSP03 } from "@/hooks/tms/use-authorization";
import { useSession } from "@/libraries/auth/use-session";
import { FormProvider, useForm } from "react-hook-form";
import { sendMessageToDevice } from "@/hooks/use-device-api";
import { TBankForm } from "./dto";
import BackHeader from "../common/back-header";
import { useQueryClient } from "@tanstack/react-query";
import { DEVICE_API } from "@/types/common";

export default function CrewBankHome() {
  const router = useRouter();
  const queryClient = useQueryClient();

  /** 근로자의 유저 ID */
  const userId = router.query.userId?.toString() || "";
  const next = (router.query.next?.toString() || "") as "" | "true" | "webview";

  const [bankImage, setBankImage] = useState<Blob | null>(null);

  const { data: session } = useSession();
  if (!session) throw new Error("FW401");

  const form = useForm<TBankForm>({
    defaultValues: {
      bankCd: "",
      bankNm: "",
      bankAccountNo: "",
    },
  });

  const WCW000002SSP03 = useWCW000002SSP03();

  const end = () => {
    if (!!window.ReactNativeWebView) {
      sendMessageToDevice({
        type: DEVICE_API.crewAuthorizationEnd,
        payload: null,
      });
    } else {
      router.back();
    }
  };

  const onClickBack = () => {
    if (bankImage) {
      setBankImage(() => null);
    } else {
      end();
    }
  };

  const onSubmit = (args: {
    bankCd: string;
    bankNm: string;
    bankAccountNo: string;
    bankImage: Blob;
  }) => {
    if (WCW000002SSP03.isPending) return;

    WCW000002SSP03.mutate(
      { ...args, userId, session },
      {
        onSuccess: async () => {
          if (next === "true") {
            router.replace(`/ko/authorization/crew/${userId}/privacy?next=true`);
          } else if (next === "webview") {
            await queryClient.invalidateQueries({ queryKey: ["WCM200801SSQ01"] });
            router.back();
          } else {
            end();
          }
        },
      },
    );
  };

  return (
    <FormProvider {...form}>
      <div className={"mobileLayout"}>
        <BackHeader title="통장등록" onClickBack={onClickBack} />

        {!bankImage ? (
          <BankCamera setBankImage={setBankImage} userId={userId} />
        ) : (
          <BankForm
            bankImage={bankImage}
            onSubmit={onSubmit}
            isLoading={WCW000002SSP03.isPending}
            session={session}
          />
        )}
      </div>
    </FormProvider>
  );
}
