import Image from "next/image";
import { useEffect, useState } from "react";
import css from "./step-3.module.scss";
import { Controller, useFormContext, useFormState } from "react-hook-form";
import { Box } from "@mantine/core";
import { findEntity, IdCardEntity } from "@/types/tp";
import { TSignUpDto } from "@/libraries/auth/auth.dto";
import { TIdTp } from "@/types/common";
import { useTCW000100SMQ03 } from "@/hooks/tms/use-master";
import CustomStep from "../common/custom-step";
import CustomButton from "../common/custom-button";
import { CustomInput } from "../common/custom-input";
import OutlineButton from "../common/outline-button";
import { replaceToNumber } from "@/utils/regexp";

interface Props {
  idTp: TIdTp;
  onClickNext: () => void;
  onClickPrev: () => void;
  images: Blob[];
  isLastStep?: boolean;
}

export default function Step3({ idTp, onClickNext, onClickPrev, images, isLastStep }: Props) {
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
      <CustomStep totalSteps={4} currentStep={3} />

      <div className={css.infoBox}>
        <div>신분증 종류: {findEntity(IdCardEntity, idTp)?.[1]}</div>
      </div>

      <div className={css.imageBox}>
        {imageUrl.map((url, index) => (
          <Image src={url} alt="신분증" fill key={`image-${index}`} />
        ))}
      </div>

      <div className={css.formBox}>
        {/* 외국인등록증 일 경우 국가 선택 */}
        {idTp.startsWith("5") && (
          <Controller
            control={form.control}
            name="cntryCd"
            render={({ field }) => (
              // <Select
              //   {...field}
              //   label="국가 선택"
              //   searchable
              //   data={TCW000100SMQ03.data?.map((d) => ({
              //     value: d.cntryCd,
              //     label: `${d.cntryKoNm}`,
              //   }))}
              //   allowDeselect={false}
              //   styles={{
              //     dropdown: {
              //       maxHeight: 250,
              //       overflow: "auto",
              //       scrollbarWidth: "auto",
              //     },
              //   }}
              //   error={fieldState.error?.message}
              //   disabled={TCW000100SMQ03.isPending}
              //   placeholder={
              //     TCW000100SMQ03.isPending
              //       ? "국가 정보를 불러오는 중입니다..."
              //       : "국가을 선택해주세요"
              //   }
              // />

              <CustomInput
                {...field}
                disabled
                value={undefined}
                onChange={undefined}
                defaultValue={field.value}
                label="국가코드"
                readOnly
                classNames={{ label: css.label, input: css.input }}
              />
            )}
          />
        )}

        {idTp.startsWith("5") && (
          <Controller
            control={form.control}
            name="visaCd"
            render={({ field }) => (
              <CustomInput
                {...field}
                disabled
                value={undefined}
                onChange={undefined}
                defaultValue={field.value}
                label="비자"
                readOnly
                classNames={{ label: css.label, input: css.input }}
              />
            )}
          />
        )}

        <Controller
          control={form.control}
          name="userNm"
          render={({ field, fieldState }) => (
            <CustomInput
              {...field}
              value={field.value}
              label="이름"
              mt={0}
              required
              error={fieldState.error?.message}
              classNames={{ label: css.label, input: css.input }}
            />
          )}
        />

        <div className={css.idBox}>
          <span>주민등록번호</span>
          <div className={css.idInputBox}>
            <Controller
              control={form.control}
              name="idNo1"
              render={({ field, fieldState }) => (
                <CustomInput
                  {...field}
                  required
                  error={fieldState.error?.message}
                  classNames={{ label: css.label, input: css.input }}
                  inputMode="numeric"
                  onChange={(e) => {
                    const value = replaceToNumber(e.target.value);
                    if (value.length > 6) return;
                    e.target.value = value;
                    field.onChange(e);
                  }}
                />
              )}
            />

            <div>-</div>

            <Controller
              control={form.control}
              name="idNo2"
              render={({ field, fieldState }) => (
                <CustomInput
                  {...field}
                  required
                  error={fieldState.error?.message}
                  classNames={{ label: css.label, input: css.input }}
                  inputMode="numeric"
                  onChange={(e) => {
                    const value = replaceToNumber(e.target.value);
                    if (value.length > 7) return;
                    e.target.value = value;
                    field.onChange(e);
                  }}
                />
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
            <CustomInput
              {...field}
              label="발급일자 (YYYYMMDD)"
              required
              error={fieldState.error?.message}
              classNames={{ label: css.label, input: css.input }}
              inputMode="numeric"
              onChange={(e) => {
                const value = replaceToNumber(e.target.value);
                if (value.length > 8) return;
                e.target.value = value;
                field.onChange(e);
              }}
            />
          )}
        />

        <Box mt={10} style={{ textAlign: "right" }}>
          <OutlineButton type="button" onClick={onClickPrev} className={css.prevButton}>
            이전
          </OutlineButton>
          <CustomButton type="button" onClick={onClickNext} className={css.nextButton}>
            다음
          </CustomButton>
        </Box>
      </div>
    </>
  );
}
