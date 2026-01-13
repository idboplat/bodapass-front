import { useRouter } from "next/router";
import css from "./find-pw.module.scss";
import { useTranslation } from "next-i18next";
import { TextInput, UnstyledButton } from "@mantine/core";
import clsx from "clsx";
import { Controller, useForm, useFormContext, UseFormReturn, useWatch } from "react-hook-form";
import { TCetRecvTp, TCetTp, useTCM200001SSP04, useTCM200001SSP05 } from "@/hooks/tms/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import CustomButton from "@/components/common/custom-button";
import { TFindPwForm } from ".";

export default function FindPw({ form }: { form: UseFormReturn<TFindPwForm> }) {
  const router = useRouter();
  const { t } = useTranslation();

  const locale = router.query.locale?.toString() || "ko";

  /** 인증번호 요청 */
  const requestVerificationCodeMutation = useTCM200001SSP04();
  /** 인증번호 확인 */
  const checkVerificationCodeMutation = useTCM200001SSP05();

  // 실시간으로 cetNo 값 감지
  const cetNo = useWatch({
    control: form.control,
    name: "cetNo",
  });

  // 실시간으로 필수 필드 값 감지
  const userId = useWatch({
    control: form.control,
    name: "userId",
  });
  const userNm = useWatch({
    control: form.control,
    name: "userNm",
  });
  const telNo = useWatch({
    control: form.control,
    name: "telNo",
  });
  const idNo = useWatch({
    control: form.control,
    name: "idNo",
  });

  const onClickRequestVerificationCode = (data: TFindPwForm) => {
    // 필수 필드 검증: 아이디, 이름, 연락처, 생년월일이 빈값이면 실행하지 않음
    if (!userId?.trim() || !userNm?.trim() || !telNo?.trim() || !idNo?.trim()) {
      return;
    }

    if (requestVerificationCodeMutation.isPending) return;

    requestVerificationCodeMutation.mutate(data, {
      onSuccess: () => {
        console.log("success");
      },
    });
  };

  const onClickCheckVerificationCode = (args: { userId: string; cetTp: TCetTp; cetNo: string }) => {
    if (checkVerificationCodeMutation.isPending) return;

    checkVerificationCodeMutation.mutate(args, {
      onSuccess: () => {
        console.log("success");
        router.push(`/${locale}/find-pw/?step=2`);
      },
    });
  };

  return (
    <div className={css.wrap}>
      <div className={css.inner}>
        <div className={css.form}>
          <div className={css.tab}>
            <button>
              <span>휴대폰 번호</span>
              <div className={css.active} />
            </button>
            <button disabled>
              <span>{/* 이메일 주소 */}</span>
              {/* <div className={css.active} /> */}
            </button>
          </div>

          <div className={css.tabBody}>
            <h3>회원가입 시 등록한 정보를 입력해주세요.</h3>

            <div className={css.userInfoBox}>
              <div>
                <Controller
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <TextInput variant="unstyled" type="text" placeholder="아이디" {...field} />
                  )}
                />
              </div>
              <div>
                <Controller
                  control={form.control}
                  name="userNm"
                  render={({ field }) => (
                    <TextInput variant="unstyled" type="text" placeholder="이름" {...field} />
                  )}
                />
              </div>
              <div>
                <Controller
                  control={form.control}
                  name="telNo"
                  render={({ field }) => (
                    <TextInput
                      variant="unstyled"
                      type="text"
                      placeholder="연락처('-' 없이 입력)"
                      inputMode="numeric"
                      {...field}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  control={form.control}
                  name="idNo"
                  render={({ field }) => (
                    <TextInput
                      variant="unstyled"
                      type="text"
                      placeholder="생년월일(YYMMDD)"
                      inputMode="numeric"
                      maxLength={6}
                      {...field}
                    />
                  )}
                />
              </div>
              <div>
                <button
                  onClick={() => onClickRequestVerificationCode(form.getValues())}
                  disabled={
                    requestVerificationCodeMutation.isPending ||
                    !userId?.trim() ||
                    !userNm?.trim() ||
                    !telNo?.trim() ||
                    !idNo?.trim()
                  }
                  className={css.requestVerificationCodeButton}
                >
                  {requestVerificationCodeMutation.isPending
                    ? "인증번호 요청 중..."
                    : "인증번호 요청"}
                </button>
              </div>
            </div>

            {requestVerificationCodeMutation.isSuccess && (
              <div
                className={clsx(
                  css.verificationCodeBox,
                  !requestVerificationCodeMutation.isSuccess && css.disabled,
                )}
              >
                <Controller
                  control={form.control}
                  name="cetNo"
                  render={({ field }) => (
                    <TextInput
                      variant="unstyled"
                      type="text"
                      placeholder="인증번호 입력"
                      inputMode="numeric"
                      disabled={!requestVerificationCodeMutation.isSuccess}
                      maxLength={6}
                      {...field}
                    />
                  )}
                />
              </div>
            )}

            {requestVerificationCodeMutation.isSuccess && (
              <div className={css.resendButtonBox}>
                <UnstyledButton
                  onClick={() => requestVerificationCodeMutation.mutate(form.getValues())}
                  className={css.resendButton}
                >
                  재전송
                </UnstyledButton>
              </div>
            )}

            <div className={css.verificationCodeButtonBox}>
              <CustomButton
                onClick={() =>
                  onClickCheckVerificationCode({
                    userId: form.getValues().userId,
                    cetTp: form.getValues().cetTp,
                    cetNo: form.getValues().cetNo,
                  })
                }
                disabled={
                  checkVerificationCodeMutation.isPending ||
                  !requestVerificationCodeMutation.isSuccess
                }
                style={{
                  borderRadius: "0px",
                }}
                variant={
                  checkVerificationCodeMutation.isPending || cetNo?.length !== 6
                    ? "gray"
                    : "default"
                }
              >
                {checkVerificationCodeMutation.isPending ? "인증 확인 중..." : "인증 확인"}
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
