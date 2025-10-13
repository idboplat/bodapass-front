import { Button, LoadingOverlay, TextInput } from "@mantine/core";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import BackHeader from "../common/back-header";
import css from "./id-card-form.module.scss";
import { TBankForm } from "./dto";

interface Props {
  bankImage: Blob;
  resetBankImage: () => void;
  onSubmit: (args: {
    bankCd: string;
    bankNm: string;
    bankAccountNo: string;
    bankImage: Blob;
  }) => void;
  isLoading: boolean;
}

export default function BankForm({ bankImage, resetBankImage, onSubmit, isLoading }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const form = useFormContext<TBankForm>();

  useEffect(() => {
    const url = URL.createObjectURL(bankImage);
    setImageUrl(() => url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [bankImage]);

  return (
    <>
      <BackHeader title="통장 등록" onClickBack={resetBankImage} />
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
        <Button
          variant="filled"
          type="button"
          onClick={() => onSubmit({ ...form.getValues(), bankImage })}
          loading={isLoading}
        >
          제출
        </Button>
      </div>

      <LoadingOverlay visible={isLoading} />
    </>
  );
}
