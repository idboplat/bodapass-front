import { TSignUpDto } from "@/libraries/auth/auth.dto";
import { TLoginTp } from "@/types/common";
import { checkPassword, removeBlank } from "@/utils/regexp";
import { Box, Checkbox } from "@mantine/core";
import { useMemo, useState } from "react";
import { Address } from "react-daum-postcode";
import { Controller, useFormContext } from "react-hook-form";
import Portal from "../common/modal/portal";
import PostCodeModal from "../common/modal/post-code-modal";
import { useRouter } from "next/router";
import { z } from "zod";
import { SOCIAL_LOGIN_SESSION_STORAGE_KEY } from "@/constants";
import css from "./leader-step-4.module.scss";
import CustomCheckbox from "../common/custom-checkbox";
import CustomButton from "../common/custom-button";
import OutlineButton from "../common/outline-button";
import CustomStep from "../common/custom-step";
import { AnimatePresence } from "motion/react";
import { CustomInput, CustomInputPassword } from "../common/custom-input";

export default function LeaderStep4({
  loginTp,
  locale,
  onClickNext,
  onClickPrev,
}: {
  loginTp: TLoginTp;
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
    const isValid = await form.trigger(["cntryCd", "zipCd", "addr", "addrDtil", "tel1"]);
    if (!isValid) return;

    if (loginTp !== "2") {
      // 소셜 회원가입시
      if (!checkPassword(form.getValues("password"))) {
        form.setError("password", {
          message: "비밀번호는 8자 이상, 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.",
        });
        return;
      }

      if (form.getValues("password") !== form.getValues("passwordConfirm")) {
        form.setError("passwordConfirm", { message: "비밀번호가 일치하지 않습니다." });
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

  const socialLoginId = useMemo(() => {
    try {
      if (loginTp !== "2") return "";
      return JSON.parse(sessionStorage.getItem(SOCIAL_LOGIN_SESSION_STORAGE_KEY) || "{}")
        ?.exterUserId as string;
    } catch (error) {
      console.error(error);
      sessionStorage.removeItem(SOCIAL_LOGIN_SESSION_STORAGE_KEY);
      router.replace(`/${locale}/signin`);
    }
  }, [loginTp, locale, router]);

  return (
    <>
      <CustomStep totalSteps={4} currentStep={4} />
      <div>
        <Controller
          control={form.control}
          name="exterUserId"
          render={({ field, fieldState }) => (
            <CustomInput
              {...field}
              value={loginTp === "2" ? socialLoginId : field.value}
              label="아이디"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(e.target.value)}
              error={fieldState.error?.message}
              required
              disabled={loginTp === "2"}
              classNames={{ label: css.label, input: css.input, required: css.required }}
              placeholder="아이디를 입력해주세요."
            />
          )}
        />

        {loginTp !== "2" && (
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <CustomInputPassword
                {...field}
                label="비밀번호"
                autoComplete="off"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const cleanedValue = removeBlank(e.target.value);
                  const valid = checkPassword(cleanedValue);

                  form.clearErrors(["password", "passwordConfirm"]);

                  if (!valid) {
                    form.setError("password", {
                      message:
                        "비밀번호는 8자 이상, 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.",
                    });
                  }

                  if (valid && cleanedValue !== form.getValues("passwordConfirm")) {
                    form.setError("password", { message: "비밀번호가 일치하지 않습니다." });
                  }

                  form.setValue("password", cleanedValue);
                }}
                error={fieldState.error?.message}
                required
                classNames={{ label: css.label, input: css.input }}
                placeholder="비밀번호 8자 이상+영문대소문자+숫자+특수문자"
              />
            )}
          />
        )}

        {loginTp !== "2" && (
          <Controller
            control={form.control}
            name="passwordConfirm"
            render={({ field, fieldState }) => (
              <CustomInputPassword
                {...field}
                label="비밀번호 확인"
                autoComplete="off"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const cleanedValue = removeBlank(e.target.value);

                  form.clearErrors(["password", "passwordConfirm"]);

                  if (cleanedValue !== form.getValues("password")) {
                    form.setError("passwordConfirm", { message: "비밀번호가 일치하지 않습니다." });
                  }

                  form.setValue("passwordConfirm", cleanedValue);
                }}
                error={fieldState.error?.message}
                required
                classNames={{ label: css.label, input: css.input }}
                placeholder="비밀번호 8자 이상+영문대소문자+숫자+특수문자"
              />
            )}
          />
        )}

        <Controller
          control={form.control}
          name="zipCd"
          render={({ field, fieldState }) => (
            <CustomInput
              {...field}
              label="우편번호"
              value={undefined}
              onChange={() => {}}
              defaultValue={field.value}
              onFocus={openPostCode}
              autoComplete="off"
              required
              readOnly
              error={fieldState.error?.message}
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
              onChange={() => {}}
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
                  // error={fieldState.error?.message}
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
                  // error={fieldState.error?.message}
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
                  // error={fieldState.error?.message}
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
                  field.onChange(removeBlank(e.target.value))
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

        <Box mt={10} style={{ textAlign: "right" }}>
          <OutlineButton type="button" onClick={handleClickPrev} className={css.prevButton}>
            이전
          </OutlineButton>
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
