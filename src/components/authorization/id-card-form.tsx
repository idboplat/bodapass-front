import Image from "next/image";
import BackHeader from "../common/back-header";
import { TScannedResult } from "./dto";
import { useEffect, useState } from "react";
import css from "./id-card-form.module.scss";
import { useForm } from "react-hook-form";
import { Button, TextInput } from "@mantine/core";

interface Props {
  scannedResult: TScannedResult;
  resetScanned: () => void;
}

export default function IdCardForm({ scannedResult, resetScanned }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const form = useForm({
    defaultValues: {
      id1: scannedResult.id1,
      id2: scannedResult.id2,
      name: scannedResult.name,
      addr: scannedResult.addr,
    },
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
      <div className={css.imageBox}>{imageUrl && <Image src={imageUrl} alt="신분증" fill />}</div>
      <div className={css.formBox}>
        <TextInput {...form.register("id1")} label="id1" />
        <TextInput {...form.register("id2")} label="id2" />
        <TextInput {...form.register("name")} label="name" />
        <TextInput {...form.register("addr")} label="addr" />
      </div>
      <div className={css.submitButtonBox}>
        <Button variant="filled" type="button" onClick={onSubmit}>
          제출
        </Button>
      </div>
    </>
  );
}
