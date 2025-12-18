import Image from "next/image";
import { useEffect, useState } from "react";
import css from "./step-4.module.scss";
import { Controller, useFormContext, useFormState } from "react-hook-form";
import { Button, Select, TextInput } from "@mantine/core";
import { findEntity, IdCardEntity } from "@/types/tp";
import { TSignUpDto } from "@/libraries/auth/auth.dto";
import { TIdTp } from "@/types/common";
import { useTCW000100SMQ03 } from "@/hooks/tms/use-master";

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

  const TCW000100SMQ03 = useTCW000100SMQ03({ session: null });

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

      {/* 외국인등록증 일 경우 국가 선택 */}
      {idTp === "3" && (
        <Controller
          control={form.control}
          name="cntryCd"
          render={({ field, fieldState }) => (
            <Select
              {...field}
              label="국가 선택"
              searchable
              data={TCW000100SMQ03.data?.map((d) => ({
                value: d.cntryCd,
                label: `${d.cntryKoNm}`,
              }))}
              allowDeselect={false}
              styles={{
                dropdown: {
                  maxHeight: 250,
                  overflow: "auto",
                  scrollbarWidth: "auto",
                },
              }}
              error={fieldState.error?.message}
              disabled={TCW000100SMQ03.isPending}
              placeholder={
                TCW000100SMQ03.isPending
                  ? "국가 정보를 불러오는 중입니다..."
                  : "국가을 선택해주세요"
              }
            />
          )}
        />
      )}

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
          name="isuDd"
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              label="발급일자 (YYYYMMDD)"
              mt={0}
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
    </>
  );
}
