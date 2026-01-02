import Image from "next/image";
import { useEffect, useState } from "react";
import css from "./id-card-form.module.scss";
import { Controller, useForm } from "react-hook-form";
import { Button, LoadingOverlay, TextInput } from "@mantine/core";
import { findEntity, IdCardEntity } from "@/types/tp";
import { Address } from "react-daum-postcode";
import Portal from "../common/modal/portal";
import PostCodeModal from "../common/modal/post-code-modal";
import { replaceToTelNumber } from "@/utils/regexp";
import { TScannedResult } from "@/libraries/auth/auth.dto";
import { AnimatePresence } from "motion/react";

interface Props {
  brkrId?: string;
  scannedResult: TScannedResult;
  onSubmit: (arg: {
    id1: string;
    id2: string;
    name: string;
    addr: string;
    addrDtil: string;
    tel: string;
    idTp: "1" | "2" | "3";
    zipCd: string;
    image: Blob;
  }) => void;
  isLoading: boolean;
}

export default function IdCardForm({ scannedResult, onSubmit, brkrId, isLoading }: Props) {
  const [showPostCode, setShowPostCode] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const form = useForm({
    defaultValues: {
      id1: scannedResult.id1,
      id2: scannedResult.id2,
      name: scannedResult.userNm,
      zipCd: "",
      addr: "",
      addrDtil: "",
      tel: "",
    },
  });

  const openPostCode = () => setShowPostCode(() => true);
  const closePostCode = () => setShowPostCode(() => false);

  const selectPostCode = (data: Address) => {
    form.setValue("addr", data.address);
    form.setValue("zipCd", data.zonecode);
    form.clearErrors(["addr", "zipCd"]);
    closePostCode();
  };

  const onTelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue("tel", replaceToTelNumber(e.target.value));
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
      <div className={css.infoBox}>
        <div>신분증 종류: {findEntity(IdCardEntity, scannedResult.idTp)?.[1]}</div>
      </div>

      <div className={css.imageBox}>{imageUrl && <Image src={imageUrl} alt="신분증" fill />}</div>

      <div className={css.formBox}>
        <TextInput {...form.register("name")} label="이름" mt={0} />

        <div className={css.idBox}>
          <label>주민등록번호</label>
          <div className={css.idInputBox}>
            <TextInput {...form.register("id1")} />
            <TextInput {...form.register("id2")} />
          </div>
        </div>

        <Controller
          control={form.control}
          name="zipCd"
          render={({ field }) => (
            <TextInput
              {...field}
              label="우편번호"
              value={undefined}
              onChange={undefined}
              defaultValue={field.value}
              onFocus={openPostCode}
            />
          )}
        />

        <Controller
          control={form.control}
          name="addr"
          render={({ field }) => (
            <TextInput
              {...field}
              label="주소"
              value={undefined}
              onChange={undefined}
              defaultValue={field.value}
              onFocus={openPostCode}
            />
          )}
        />

        <TextInput {...form.register("addrDtil")} label="상세주소" />

        <TextInput
          {...form.register("tel")}
          label="전화번호"
          onChange={onTelChange}
          inputMode="numeric"
        />
      </div>

      <div className={css.submitButtonBox}>
        <Button
          variant="filled"
          type="button"
          onClick={() =>
            onSubmit({ ...form.getValues(), idTp: scannedResult.idTp, image: scannedResult.image })
          }
          loading={isLoading}
        >
          제출
        </Button>
      </div>

      <LoadingOverlay visible={isLoading} />

      {showPostCode && (
        <Portal>
          <AnimatePresence>
            <PostCodeModal onClose={closePostCode} onComplete={selectPostCode} />
          </AnimatePresence>
        </Portal>
      )}
    </>
  );
}
