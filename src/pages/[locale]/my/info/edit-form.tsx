import Portal from "@/components/common/modal/portal";
import PostCodeModal from "@/components/common/modal/post-code-modal";
import { TWCM200801SSQ01Data, useTCM200801SSP01 } from "@/hooks/tms/use-worker";
import { Button, LoadingOverlay, TextInput } from "@mantine/core";
import { useState } from "react";
import { Address } from "react-daum-postcode";
import { Controller, useForm } from "react-hook-form";
import css from "./edit-form.module.scss";
import { nativeAlert, sendMessageToDevice } from "@/hooks/use-device-api";
import { DEVICE_API } from "@/types/common";
import { useRouter } from "next/router";
import { AnimatePresence } from "motion/react";
import CustomButton from "@/components/common/custom-button";
import { CustomInput } from "@/components/common/custom-input";

interface Props {
  session: Session;
  userData: TWCM200801SSQ01Data;
}

export default function InfoEditForm({ session, userData }: Props) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      addr: userData.addr,
      addrDtil: userData.addrDtil,
      zipCd: userData.zipCd,
    },
  });

  const [showPostCode, setShowPostCode] = useState(false);

  const openPostCode = () => setShowPostCode(() => true);
  const closePostCode = () => setShowPostCode(() => false);

  const selectPostCode = (data: Address) => {
    form.setValue("addr", data.address);
    form.setValue("zipCd", data.zonecode);
    form.clearErrors(["addr", "zipCd"]);
    closePostCode();
  };

  const mutation = useTCM200801SSP01();

  const onSubmit = async () => {
    if (mutation.isPending) return;

    await mutation.mutateAsync(
      {
        session: session,
        telNo: userData.telNo,
        userNm: userData.userNm,
        IdNo: userData.idNo,
        loginTp: userData.loginTp,
        addr: form.watch("addr"),
        addrDtil: form.watch("addrDtil"),
        zipCd: form.watch("zipCd"),
        cntryCd: userData.cntryCd,
        wrkTp: userData.wrkTp,
        emailAddr: "",
      },
      {
        onSuccess: () => {
          nativeAlert("사용자 정보가 수정되었습니다.");

          if (!!window.ReactNativeWebView) {
            sendMessageToDevice({
              type: DEVICE_API.userInfoEditEnd,
              payload: null,
            });
          } else {
            router.back();
          }
        },
      },
    );
  };

  return (
    <>
      <div className={css.formBox}>
        <Controller
          control={form.control}
          name="zipCd"
          render={({ field }) => (
            <CustomInput
              {...field}
              label="우편번호"
              onFocus={openPostCode}
              required
              classNames={{ label: css.label, input: css.input }}
            />
          )}
        />

        <Controller
          control={form.control}
          name="addr"
          render={({ field }) => (
            <CustomInput
              {...field}
              label="주소"
              onFocus={openPostCode}
              required
              classNames={{ label: css.label, input: css.input }}
            />
          )}
        />

        <Controller
          control={form.control}
          name="addrDtil"
          render={({ field }) => (
            <CustomInput
              {...field}
              label="상세주소"
              required
              classNames={{ label: css.label, input: css.input }}
            />
          )}
        />
      </div>

      <div className={css.submitButtonBox}>
        <CustomButton type="button" onClick={onSubmit} disabled={mutation.isPending} fullWidth>
          완료
        </CustomButton>
      </div>

      <AnimatePresence>
        {showPostCode && (
          <Portal>
            <PostCodeModal onClose={closePostCode} onComplete={selectPostCode} />
          </Portal>
        )}
      </AnimatePresence>

      <LoadingOverlay visible={mutation.isPending} />
    </>
  );
}
