import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import css from "./reset-pw.module.scss";
import { Controller, useFormContext, UseFormReturn, useWatch } from "react-hook-form";
import { LoadingOverlay, PasswordInput, TextInput } from "@mantine/core";
import { TFindPwForm } from ".";
import { useTCM200001SSP06 } from "@/hooks/tms/use-auth";
import CustomButton from "@/components/common/custom-button";

export default function ResetPw({ form }: { form: UseFormReturn<TFindPwForm> }) {
  const router = useRouter();
  const { t } = useTranslation();

  const locale = router.query.locale?.toString() || "ko";

  const resetPwMutation = useTCM200001SSP06();

  const password = useWatch({
    control: form.control,
    name: "password",
  });
  const passwordConfirm = useWatch({
    control: form.control,
    name: "passwordConfirm",
  });

  // 비밀번호가 다를 때 에러 메시지 표시
  const isPasswordMismatch = passwordConfirm && password && password !== passwordConfirm;

  const onClickResetPw = (data: TFindPwForm) => {
    if (resetPwMutation.isPending) return;

    const payload = {
      userId: data.userId,
      userPswd: data.password,
      cetTp: data.cetTp,
      cetNo: data.cetNo,
    };

    resetPwMutation.mutate(payload, {
      onSuccess: () => {
        console.log("success");
        router.replace(`/${locale}/find-pw/?step=3`);
      },
    });
  };
  return (
    <>
      <div className={css.wrap}>
        <div className={css.inner}>
          <h3>회원님의 비밀번호 재설정해주세요.</h3>

          <div className={css.form}>
            <div className={css.userInfoBox}>
              <div>
                <Controller
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <PasswordInput
                      variant="unstyled"
                      type="text"
                      placeholder="비밀번호(8자 이상+영문대소문자+숫자+특수문자)"
                      classNames={{
                        input: css.input,
                      }}
                      {...field}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  control={form.control}
                  name="passwordConfirm"
                  render={({ field }) => (
                    <PasswordInput
                      variant="unstyled"
                      type="text"
                      placeholder="비밀번호 확인"
                      classNames={{
                        input: css.input,
                      }}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

            <div className={css.errorMessage}>
              {isPasswordMismatch && "비밀번호가 일치하지 않습니다."}
            </div>

            <div className={css.buttonBox}>
              <CustomButton
                onClick={() => onClickResetPw(form.getValues())}
                disabled={resetPwMutation.isPending}
                style={{ borderRadius: "0px" }}
                fullWidth
              >
                설정 완료
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
      <LoadingOverlay visible={resetPwMutation.isPending} />
    </>
  );
}
