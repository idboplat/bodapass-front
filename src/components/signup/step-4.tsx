import Image from "next/image";
import { useEffect, useState } from "react";
import css from "./step-4.module.scss";
import { Controller, useFormContext, useFormState } from "react-hook-form";
import { Button, TextInput } from "@mantine/core";
import { findEntity, IdCardEntity } from "@/types/tp";
import { TSignUpDto } from "@/libraries/auth/auth.dto";
import { TIdTp } from "@/types/common";

interface Props {
  idTp: TIdTp;
  onClickNext: () => void;
  onClickPrev: () => void;
  images: Blob[];
  isLastStep?: boolean;
}

export default function Step4({ idTp, onClickNext, onClickPrev, images, isLastStep }: Props) {
  const form = useFormContext<TSignUpDto>();
  const { errors } = useFormState({ control: form.control });

  const [imageUrl, setImageUrl] = useState<string[]>([]);

  useEffect(() => {
    const urls = images.map((image) => URL.createObjectURL(image));
    setImageUrl(() => urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  return (
    <>
      <div className={css.infoBox}>
        <div>신분증 종류: {findEntity(IdCardEntity, idTp)?.[1]}</div>
      </div>

      <div className={css.imageBox}>
        {imageUrl.map((url, index) => (
          <Image src={url} alt="신분증" fill key={`image-${index}`} />
        ))}
      </div>

      <div className={css.formBox}>
        <Controller
          control={form.control}
          name="userNm"
          render={({ field, fieldState }) => (
            <TextInput {...field} label="이름" mt={0} required error={fieldState.error?.message} />
          )}
        />

        <div className={css.idBox}>
          <label>주민등록번호</label>
          <div className={css.idInputBox}>
            <Controller
              control={form.control}
              name="idNo1"
              render={({ field }) => (
                <TextInput {...field} required error={!!errors.idNo1?.message} />
              )}
            />

            <span>-</span>

            <Controller
              control={form.control}
              name="idNo2"
              render={({ field }) => (
                <TextInput {...field} required error={!!errors.idNo2?.message} />
              )}
            />
          </div>
          {errors.idNo1?.message && <div className={css.errorMessage}>{errors.idNo1?.message}</div>}
          {errors.idNo2?.message && <div className={css.errorMessage}>{errors.idNo2?.message}</div>}
        </div>
      </div>

      <div className={css.submitButtonBox}>
        <Button variant="outline" type="button" onClick={onClickPrev} mr={12}>
          이전
        </Button>

        <Button variant="filled" type="button" onClick={onClickNext}>
          {isLastStep ? "제출" : "다음"}
        </Button>
      </div>
    </>
  );
}
