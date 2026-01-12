import { TWCM200801SSQ01Data, useTCM200801SSP02 } from "@/hooks/tms/use-worker";
import { Button, LoadingOverlay, TextInput } from "@mantine/core";
import { Controller, useForm, useWatch } from "react-hook-form";
import css from "./delete-account-form.module.scss";
import { nativeAlert, sendMessageToDevice } from "@/hooks/use-device-api";
import { DEVICE_API } from "@/types/common";
import { useRouter } from "next/router";
import WarningIcon from "/public/assets/svg/warning.svg";
import CustomButton from "@/components/common/custom-button";
import { CustomInput, CustomInputPassword } from "@/components/common/custom-input";
import CustomCheckbox from "@/components/common/custom-checkbox";
import { useState } from "react";

interface Props {
  session: Session;
}

export default function DeleteAccountForm({ session }: Props) {
  const router = useRouter();
  const locale = router.query.locale?.toString() || "ko";
  const [isAgree, setIsAgree] = useState(false);
  const mutation = useTCM200801SSP02();

  const onSubmit = async () => {
    if (mutation.isPending) return;

    mutation.mutate(session, {
      onSuccess: () => {
        nativeAlert("회원탈퇴가 완료되었습니다.");

        if (!!window.ReactNativeWebView) {
          sendMessageToDevice({
            type: DEVICE_API.deleteAccountEnd,
            payload: null,
          });
        } else {
          router.replace(`/${locale}/signin`);
        }
      },
    });
  };

  return (
    <div className={css.container}>
      <div className={css.content}>
        <div className={css.warningBox}>
          <WarningIcon />
          <h2 className={css.title}>회원탈퇴</h2>
          <p className={css.warningText}>
            일당백 회원탈퇴를 하시겠습니까?
            <br />
            탈퇴 후에는 모든 정보가 삭제되며
            <br />
            복구할 수 없습니다.
          </p>
        </div>

        <div className={css.formBox}>
          {/* <Controller
            control={form.control}
            name="password"
            render={({ field }) => (
              <CustomInputPassword
                {...field}
                label="비밀번호 확인"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                required
                classNames={{ label: css.label, input: css.input }}
              />
            )}
          /> */}
          <CustomCheckbox
            label="동의합니다."
            required
            checked={isAgree}
            className={css.checkbox}
            onChange={(e) => setIsAgree(e.target.checked)}
          />
        </div>

        <div className={css.buttonBox}>
          <CustomButton
            type="button"
            onClick={onSubmit}
            disabled={mutation.isPending || !isAgree}
            style={{ borderRadius: "0px" }}
            fullWidth
          >
            확인
          </CustomButton>
        </div>
      </div>

      <LoadingOverlay visible={mutation.isPending} />
    </div>
  );
}
