import { TSignUpDto } from "@/libraries/auth/auth.dto";
import { onNoSpaceChange } from "@/utils/input-handler";
import { Box, Button, Checkbox, Select, TextInput } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
import { TWrkTp } from "@/types/common";
import { useState } from "react";
import { Address } from "react-daum-postcode";
import Portal from "../common/modal/portal";
import PostCodeModal from "../common/modal/post-code-modal";
import { useRouter } from "next/router";
import { z } from "zod";
import css from "./crew-step-4.module.scss";
import CustomStep from "../common/custom-step";
import CustomCheckbox from "../common/custom-checkbox";
import CustomButton from "../common/custom-button";
import { AnimatePresence } from "motion/react";
import { CustomInput } from "../common/custom-input";

export default function CrewStep4({
  session,
  wrkTp,
  locale,
  onClickNext,
  onClickPrev,
}: {
  session: Session;
  wrkTp: TWrkTp;
  locale: string;
  onClickNext: () => void;
  onClickPrev: () => void;
}) {
  const router = useRouter();

  const [showPostCode, setShowPostCode] = useState(false);
  const [isEmailCheck, setIsEmailCheck] = useState(false);

  const form = useFormContext<TSignUpDto>();

  const openPostCode = () => setShowPostCode(() => true);
  const closePostCode = () => setShowPostCode(() => false);

  const selectPostCode = (data: Address) => {
    form.setValue("addr", data.address);
    form.setValue("zipCd", data.zonecode);
    form.clearErrors(["addr", "zipCd"]);
    closePostCode();
  };

  const changeWrkTp = (wrkTp: TWrkTp) => {
    const searchParams = new URLSearchParams(router.asPath.split("?")[1]);
    searchParams.set("wrkTp", wrkTp);
    router.replace(`/${locale}/signup/?${searchParams.toString()}`);
  };

  const handleEmailCheck = () => {
    setIsEmailCheck((prev) => {
      if (prev === false) {
        // 이메일 초기화
        form.setValue("emailAddr", "");
        form.clearErrors("emailAddr");
      }
      return !prev;
    });
  };

  const handleClickPrev = () => onClickPrev();

  const handleClickNext = async () => {
    const isValid = await form.trigger([
      "cntryCd",
      "zipCd",
      "addr",
      "addrDtil",
      "tel1",
      "tel2",
      "tel3",
    ]);
    if (!isValid) return;

    if (isEmailCheck) {
      const result = z.string().email().safeParse(form.getValues("emailAddr"));

      if (!result.success) {
        form.setError("emailAddr", { message: "이메일 형식이 올바르지 않습니다." });
        return;
      }
    }

    if (isEmailCheck) {
      const result = z.string().email().safeParse(form.getValues("emailAddr"));

      if (!result.success) {
        form.setError("emailAddr", { message: "이메일 형식이 올바르지 않습니다." });
        return;
      }
    }

    onClickNext();
  };

  return (
    <>
      <CustomStep totalSteps={4} currentStep={4} />

      <div>
        {/* 추후에 다시 필요할 수 도 있음 */}
        {/* <Select
        label="근로 구분"
        
        value={wrkTp}
        data={[
          { value: "2", label: "팀원" },
          { value: "3", label: "일용직" },
        ]}
        allowDeselect={false}
        onChange={(value) => changeWrkTp(value as "2" | "3")}
      /> */}

        <Controller
          control={form.control}
          name="zipCd"
          render={({ field, fieldState }) => (
            <CustomInput
              {...field}
              label="우편번호"
              value={undefined}
              onChange={undefined}
              defaultValue={field.value}
              onFocus={openPostCode}
              error={fieldState.error?.message}
              autoComplete="off"
              required
              readOnly
              classNames={{ label: css.label, input: css.input }}
            />
          )}
        />

        <Controller
          control={form.control}
          name="addr"
          render={({ field, fieldState }) => (
            <CustomInput
              {...field}
              label="주소"
              value={undefined}
              onChange={undefined}
              defaultValue={field.value}
              onFocus={openPostCode}
              error={fieldState.error?.message}
              autoComplete="off"
              readOnly
              required
              classNames={{ label: css.label, input: css.input }}
            />
          )}
        />

        <Controller
          control={form.control}
          name="addrDtil"
          render={({ field, fieldState }) => (
            <CustomInput
              {...field}
              label="상세주소"
              required
              error={fieldState.error?.message}
              autoComplete="address-line2"
              classNames={{ label: css.label, input: css.input }}
            />
          )}
        />

        <div className={css.telContainer}>
          <label htmlFor="tel" className={css.telLabel}>
            전화번호
            <span className={css.required}>*</span>
          </label>
          <div className={css.telInputBox}>
            <Controller
              control={form.control}
              name="tel1"
              render={({ field, fieldState }) => (
                <CustomInput
                  {...field}
                  inputMode="numeric"
                  required
                  autoComplete="tel1"
                  error={fieldState.error?.message}
                  classNames={{ label: css.label, input: css.input }}
                />
              )}
            />
            -
            <Controller
              control={form.control}
              name="tel2"
              render={({ field, fieldState }) => (
                <CustomInput
                  {...field}
                  inputMode="numeric"
                  required
                  autoComplete="tel2"
                  error={fieldState.error?.message}
                  classNames={{ label: css.label, input: css.input }}
                />
              )}
            />
            -
            <Controller
              control={form.control}
              name="tel3"
              render={({ field, fieldState }) => (
                <CustomInput
                  {...field}
                  inputMode="numeric"
                  required
                  autoComplete="tel3"
                  error={fieldState.error?.message}
                  classNames={{ label: css.label, input: css.input }}
                />
              )}
            />
          </div>
        </div>

        <div className={css.emailCheck}>
          <label className={css.emailCheckLabel} htmlFor="emailAgree">
            이메일 등록 여부
          </label>
          <CustomCheckbox id="emailAgree" checked={isEmailCheck} onChange={handleEmailCheck} />
        </div>

        {isEmailCheck && (
          <Controller
            control={form.control}
            name="emailAddr"
            render={({ field, fieldState }) => (
              <CustomInput
                {...field}
                label="이메일"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onNoSpaceChange(e, field.onChange)
                }
                inputMode="email"
                autoComplete="email"
                required
                error={fieldState.error?.message}
                classNames={{ label: css.label, input: css.input }}
              />
            )}
          />
        )}

        <Box mt={28} style={{ textAlign: "right" }}>
          <Button
            variant="outline"
            type="button"
            onClick={handleClickPrev}
            className={css.prevButton}
          >
            이전
          </Button>
          <CustomButton type="button" onClick={handleClickNext} className={css.nextButton}>
            다음
          </CustomButton>
        </Box>
      </div>

      <AnimatePresence>
        {showPostCode && (
          <Portal>
            <PostCodeModal onClose={closePostCode} onComplete={selectPostCode} />
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
}
