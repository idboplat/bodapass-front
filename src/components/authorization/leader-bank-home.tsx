import { useState } from "react";
import BankCamera from "./bank-camera";
import BankForm from "./bank-form";
import { useSession } from "@/libraries/auth/use-session";
import { FormProvider, useForm } from "react-hook-form";
import { sendMessageToDevice } from "@/hooks/use-device-api";
import { useRouter } from "next/router";
import { useWCW000001SSP03 } from "@/hooks/tms/use-authorization";
import { TBankForm } from "./dto";
import BackHeader from "../common/back-header";
import { useQueryClient } from "@tanstack/react-query";
import { DEVICE_API } from "@/types/common";

interface Props {}

export default function LeaderBankHome({}: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const locale = router.query.locale;
  const next = (router.query.next?.toString() || "") as "" | "true" | "webview";

  const [bankImage, setBankImage] = useState<Blob | null>(null);

  const { data: session } = useSession();
  if (!session) throw new Error("Session is not found");
  /** 반장의 유저 ID */
  const userId = session.userId;

  const form = useForm<TBankForm>({
    defaultValues: {
      bankCd: "",
      bankNm: "",
      bankAccountNo: "",
    },
  });

  const WCW000001SSP03 = useWCW000001SSP03();

  const end = () => {
    if (!!window.ReactNativeWebView) {
      sendMessageToDevice({
        type: DEVICE_API.leaderAuthorizationEnd,
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
    if (WCW000001SSP03.isPending) return;

    WCW000001SSP03.mutate(
      { ...args, userId, session },
      {
        onSuccess: async () => {
          if (next === "true") {
            router.replace(`/ko/authorization/leader/privacy?next=true`);
          } else if (next === "webview") {
            await queryClient.invalidateQueries({ queryKey: ["TCM200801SSQ01"] });
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
            isLoading={WCW000001SSP03.isPending}
            session={session}
          />
        )}
      </div>
    </FormProvider>
  );
}
