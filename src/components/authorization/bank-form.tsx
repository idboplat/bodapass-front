import { Button, LoadingOverlay, Select, TextInput } from "@mantine/core";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import css from "./bank-form.module.scss";
import { TBankForm } from "./dto";
import { useTCW000100SMQ01 } from "@/hooks/tms/use-authorization";
import CustomStep from "../common/custom-step";
import CustomButton from "../common/custom-button";
import { CustomInput } from "../common/custom-input";

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

  const { data: bankData, isPending: isBankDataLoading } = useTCW000100SMQ01(session);

  useEffect(() => {
    const url = URL.createObjectURL(bankImage);
    setImageUrl(() => url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [bankImage]);

  return (
    <div className={css.wrap}>
      <CustomStep currentStep={3} totalSteps={4} />
      <div className={css.imageBox}>{imageUrl && <Image src={imageUrl} alt="통장" fill />}</div>

      <div className={css.formBox}>
        <Select
          {...form.register("bankCd")}
          label="은행선택"
          searchable
          data={bankData?.rows.map((d) => ({ value: d.bankCd, label: d.bankNm }))}
          allowDeselect={false}
          onChange={(value) => {
            form.setValue("bankCd", value || "");
            form.setValue("bankNm", bankData?.rows.find((d) => d.bankCd === value)?.bankNm || "");
          }}
          value={form.getValues("bankCd")}
          withScrollArea={false}
          styles={{
            dropdown: {
              maxHeight: 250,
              overflow: "auto",
              scrollbarWidth: "auto",
              overflowY: "auto",
            },
          }}
          defaultValue={form.watch("bankCd")}
          disabled={isBankDataLoading}
          placeholder={
            isBankDataLoading ? "은행 정보를 불러오는 중입니다..." : "은행을 선택해주세요"
          }
          mt="1rem"
          required
          classNames={{ label: css.label, input: css.input, required: css.required }}
        />
        <CustomInput
          {...form.register("bankAccountNo")}
          label="계좌번호"
          required
          classNames={{ label: css.label, input: css.input, required: css.required }}
        />
      </div>

      <div className={css.buttonWrapper}>
        <CustomButton
          type="button"
          fullWidth
          onClick={() => onSubmit({ ...form.getValues(), bankImage })}
          disabled={isLoading}
        >
          등록하기
        </CustomButton>
      </div>

      <LoadingOverlay visible={isLoading} />
    </div>
  );
}
