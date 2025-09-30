import { sendMessageToDevice } from "@/hooks/use-device-api";
import { useSession } from "@/libraries/auth/use-session";
import { callWas, StringRspnData } from "@/libraries/call-tms";
import { Button, LoadingOverlay, TextInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BackHeader from "../common/back-header";
import { TBankDto } from "./dto";
import css from "./id-card-form.module.scss";

interface Props {
  bankDto: TBankDto;
  setStep: (step: "camera" | "form") => void;
  bankImageSrc: Blob | null;
}

export default function BankForm({ bankDto, setStep, bankImageSrc }: Props) {
  const { data: session } = useSession();
  if (!session) throw new Error("Session is not found");
  if (!bankImageSrc) throw new Error("Bank image source is not found");

  const router = useRouter();
  const locale = router.query.locale;

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      bankCd: "",
      bankNm: "",
      bankAccountNo: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (args: TBankDto) => {
      const result = await callWas<StringRspnData<1>>({
        svcId: "TCW000002SSP03",
        apiPathName: "WCW000002SSP03",
        locale: "ko",
        session,
        data: [
          args.userId,
          "jpeg",
          form.getValues("bankCd"),
          form.getValues("bankNm"),
          form.getValues("bankAccountNo"),
          "",
        ],
        formData: [bankImageSrc],
      });

      const data = result.svcRspnData?.[0];

      if (!data) throw new Error("FW999");

      return { bankImageSrc: data.F01 };
    },
    onSuccess: () => {
      setStep("camera");
      if (window.ReactNativeWebView) {
        sendMessageToDevice({
          type: "authorizationEnd",
          payload: null,
        });
      }
    },
  });

  const onSubmit = () => {
    console.log(form.getValues());
    mutation.mutate({
      userId: bankDto.userId,
      bankCd: form.getValues("bankCd"),
      bankNm: form.getValues("bankNm"),
      bankAccountNo: form.getValues("bankAccountNo"),
    });
  };

  useEffect(() => {
    const url = URL.createObjectURL(bankImageSrc);
    setImageUrl(() => url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [bankImageSrc]);

  return (
    <>
      <BackHeader title="통장 등록" onClickBack={() => setStep("camera")} />
      {/* <div className={css.infoBox}>
        <div>반장 ID: {brkrId}</div>
        <div>신분증 종류: {findEntity(IdCardEntity, scannedResult.type)?.[1]}</div>
      </div> */}

      <div className={css.imageBox}>{imageUrl && <Image src={imageUrl} alt="통장" fill />}</div>

      <div className={css.formBox}>
        <TextInput {...form.register("bankCd")} label="은행 코드" mt={0} />
        <TextInput {...form.register("bankNm")} label="은행 이름" mt={0} />
        <TextInput {...form.register("bankAccountNo")} label="계좌 번호" mt={0} />
      </div>

      <div className={css.submitButtonBox}>
        <Button variant="filled" type="button" onClick={onSubmit} loading={mutation.isPending}>
          제출
        </Button>
      </div>

      <LoadingOverlay visible={mutation.isPending} />
    </>
  );
}
