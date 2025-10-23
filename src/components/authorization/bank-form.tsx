import { Button, LoadingOverlay, Select, TextInput } from "@mantine/core";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import css from "./id-card-form.module.scss";
import { TBankForm } from "./dto";
import { useTCW000100SMQ01 } from "@/hooks/tms/use-authorization";

interface Props {
  bankImage: Blob;
  onSubmit: (args: {
    bankCd: string;
    bankNm: string;
    bankAccountNo: string;
    bankImage: Blob;
  }) => void;
  isLoading: boolean;
  session: Session;
}

export default function BankForm({ bankImage, onSubmit, isLoading, session }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const form = useFormContext<TBankForm>();

  useEffect(() => {
    const url = URL.createObjectURL(bankImage);
    setImageUrl(() => url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [bankImage]);

  const { data: bankData } = useTCW000100SMQ01(session);

  return (
    <>
      {/* <div className={css.infoBox}>
        <div>반장 ID: {brkrId}</div>
        <div>신분증 종류: {findEntity(IdCardEntity, scannedResult.type)?.[1]}</div>
      </div> */}

      <div className={css.imageBox}>{imageUrl && <Image src={imageUrl} alt="통장" fill />}</div>

      <div className={css.formBox}>
        {/* <TextInput {...form.register("bankCd")} label="은행 코드" mt={0} /> */}
        <Select
          {...form.register("bankCd")}
          label="은행"
          searchable
          data={bankData?.rows.map((d) => ({ value: d.bankCd, label: d.bankNm }))}
          allowDeselect={false}
          onChange={(value) => {
            form.setValue("bankCd", value || "");
            form.setValue("bankNm", bankData?.rows.find((d) => d.bankCd === value)?.bankNm || "");
          }}
          value={form.getValues("bankCd")}
          styles={{
            dropdown: {
              maxHeight: 400,
              overflow: "auto",
              scrollbarWidth: "auto",
            },
          }}
          defaultValue={form.watch("bankCd")}
        />
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
