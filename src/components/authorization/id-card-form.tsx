import Image from "next/image";
import BackHeader from "../common/back-header";
import { TScannedResult } from "./dto";
import { useEffect, useState } from "react";
import css from "./id-card-form.module.scss";
import { useForm } from "react-hook-form";
import { Button, LoadingOverlay, TextInput } from "@mantine/core";
import { findEntity, IdCardEntity } from "@/types/tp";
import { useMutation } from "@tanstack/react-query";
import { callWas, StringRspnData } from "@/libraries/call-tms";
import { useRouter } from "next/router";

interface Props {
  brkrId: string;
  scannedResult: TScannedResult;
  resetScanned: () => void;
}

export default function IdCardForm({ scannedResult, resetScanned, brkrId }: Props) {
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const form = useForm({
    defaultValues: {
      id: scannedResult.id,
      name: scannedResult.name,
      addr: scannedResult.addr,
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await callWas<StringRspnData<1>>({
        svcId: "TCW000002SSP02",
        apiPathName: "WCW000002SSP02",
        session: null,
        locale: "ko",
        data: [
          brkrId,
          "jpeg",
          scannedResult.name,
          scannedResult.id,
          scannedResult.type,
          scannedResult.addr,
        ],
        formData: [scannedResult.image],
      });

      const data = res.svcRspnData?.[0];

      if (!data) throw new Error("FW999");

      return data;
    },
    onSuccess: () => {},
  });

  const onSubmit = () => {
    console.log(form.getValues());
  };

  useEffect(() => {
    const url = URL.createObjectURL(scannedResult.image);
    setImageUrl(() => url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [scannedResult.image]);

  return (
    <>
      <BackHeader title="신분증" onClickBack={resetScanned} />
      <div>반장 ID: {brkrId}</div>
      <div>신분증 종류: {findEntity(IdCardEntity, scannedResult.type)?.[1]}</div>

      <div className={css.imageBox}>{imageUrl && <Image src={imageUrl} alt="신분증" fill />}</div>

      <div className={css.formBox}>
        <TextInput {...form.register("id")} label="id" />
        <TextInput {...form.register("name")} label="name" />
        <TextInput {...form.register("addr")} label="addr" />
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
