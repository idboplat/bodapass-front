import { useState } from "react";
import BankCamera from "./bank-camera";
import BankForm from "./bank-form";
import { useRouter } from "next/router";
import { useWCW000002SSP03 } from "@/hooks/tms/use-authorization";
import { useSession } from "@/libraries/auth/use-session";
import { FormProvider, useForm } from "react-hook-form";
import { sendMessageToDevice } from "@/hooks/use-device-api";
import { TBankForm } from "./dto";

interface Props {}

export default function CrewBankHome({}: Props) {
  const router = useRouter();
  /** 근로자의 유저 ID */
  const userId = router.query.userId?.toString() || "";

  const [bankImage, setBankImage] = useState<Blob | null>(null);

  const { data: session } = useSession();
  if (!session) throw new Error("Session is not found");

  const form = useForm<TBankForm>({
    defaultValues: {
      bankCd: "",
      bankNm: "",
      bankAccountNo: "",
    },
  });

  const WCW000002SSP03 = useWCW000002SSP03();

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
        onSuccess: () => {
          if (window.ReactNativeWebView) {
            sendMessageToDevice({
              type: "authorizationEnd",
              payload: null,
            });
          }
        },
      },
    );
  };

  const resetBankImage = () => setBankImage(null);

  return (
    <FormProvider {...form}>
      <div className={"mobileLayout"}>
        {!bankImage ? (
          <BankCamera setBankImage={setBankImage} userId={userId} />
        ) : (
          <BankForm
            bankImage={bankImage}
            resetBankImage={resetBankImage}
            onSubmit={onSubmit}
            isLoading={WCW000002SSP03.isPending}
          />
        )}
      </div>
    </FormProvider>
  );
}
