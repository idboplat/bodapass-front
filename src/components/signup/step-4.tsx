import Image from "next/image";
import { useEffect, useState } from "react";
import css from "./step-4.module.scss";
import { Controller, useFormContext, useFormState } from "react-hook-form";
import { Button, TextInput } from "@mantine/core";
import { findEntity, IdCardEntity } from "@/types/tp";
import { Address } from "react-daum-postcode";
import Portal from "../common/modal/portal";
import PostCodeModal from "../common/modal/post-code-modal";
import { replaceToTelNumber } from "@/utils/regexp";
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

  const [showPostCode, setShowPostCode] = useState(false);
  const [imageUrl, setImageUrl] = useState<string[]>([]);

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

        <Controller
          control={form.control}
          name="zipCd"
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              label="우편번호"
              value={undefined}
              onChange={undefined}
              defaultValue={field.value}
              onFocus={openPostCode}
              required
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="addr"
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              label="주소"
              value={undefined}
              onChange={undefined}
              defaultValue={field.value}
              onFocus={openPostCode}
              error={fieldState.error?.message}
              required
            />
          )}
        />

        <Controller
          control={form.control}
          name="addrDtil"
          render={({ field, fieldState }) => (
            <TextInput {...field} label="상세주소" required error={fieldState.error?.message} />
          )}
        />

        <Controller
          control={form.control}
          name="tel"
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              label="전화번호"
              onChange={onTelChange}
              placeholder="-를 제외하고 입력해주세요."
              inputMode="numeric"
              required
              error={fieldState.error?.message}
            />
          )}
        />
      </div>

      <div className={css.submitButtonBox}>
        <Button variant="outline" type="button" onClick={onClickPrev} mr={12}>
          이전
        </Button>

        <Button variant="filled" type="button" onClick={onClickNext}>
          {isLastStep ? "제출" : "다음"}
        </Button>
      </div>

      {showPostCode && (
        <Portal>
          <PostCodeModal onClose={closePostCode} onComplete={selectPostCode} />
        </Portal>
      )}
    </>
  );
}
