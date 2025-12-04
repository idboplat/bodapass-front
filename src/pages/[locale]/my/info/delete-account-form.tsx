import { TWCM200801SSQ01Data, useTCM200801SSP02 } from "@/hooks/tms/use-worker";
import { Button, LoadingOverlay, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import css from "./delete-account-form.module.scss";
import { nativeAlert, sendMessageToDevice } from "@/hooks/use-device-api";
import { DEVICE_API } from "@/types/common";
import { useRouter } from "next/router";

interface Props {
  session: Session;
  userData: TWCM200801SSQ01Data;
}

export default function DeleteAccountForm({ session, userData }: Props) {
  const router = useRouter();
  const locale = router.query.locale?.toString() || "ko";

  const form = useForm({
    defaultValues: {
      password: "",
    },
  });

  const mutation = useTCM200801SSP02();
  const onSubmit = async () => {
    if (mutation.isPending) return;

    await mutation.mutateAsync(
      {
        session: session,
        password: form.watch("password"),
      },
      {
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
      },
    );
  };

  return (
    <div className={css.container}>
      <div className={css.content}>
        <div className={css.warningBox}>
          <div className={css.warningIcon}>⚠️</div>
          <h2 className={css.title}>회원 탈퇴</h2>
          <p className={css.warningText}>
            일당백 회원탈퇴를 하시겠습니까?
            <br />
            탈퇴 후에는 모든 정보가 삭제되며
            <br />
            복구할 수 없습니다.
          </p>
        </div>

        <div className={css.formBox}>
          <Controller
            control={form.control}
            name="password"
            render={({ field }) => (
              <TextInput
                {...field}
                label="비밀번호 확인"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                required
              />
            )}
          />
        </div>

        <div className={css.buttonBox}>
          <Button
            variant="filled"
            type="button"
            onClick={onSubmit}
            // disabled={mutation.isPending || !form.watch("password")}
            className={css.deleteButton}
          >
            회원 탈퇴
          </Button>
        </div>
      </div>

      <LoadingOverlay visible={mutation.isPending} />
    </div>
  );
}
