import {
  TWCM200201SSQ01Data,
  useTCM200201SSP02,
  useTCM200201SSP03,
} from "@/hooks/tms/use-contract";
import { roundDecimal } from "@/utils/number-formatter";
import { Button, Checkbox, LoadingOverlay, Select, Textarea, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { nativeAlert, sendMessageToDevice } from "@/hooks/use-device-api";
import { useTCW000100SMQ02 } from "@/hooks/tms/use-master";
import { DEVICE_API } from "@/types/common";
import css from "./worker-update-form.module.scss";
import { Building, Calendar, DollarSign, FileText, MapPin, Send, User } from "lucide-react";
import { DatePickerInput } from "@mantine/dates";
import { addComma } from "@/utils/regexp";
import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import Portal from "@/components/common/modal/portal";
import ConfirmModal from "@/components/common/modal/confirm-modal";
import { PORTAL_MODAL_CONTAINER_ID } from "@/constants";
import CancelConfirmModal from "./cancel-confirm-modal";

const workerUpdateDto = z.object({
  instCd: z.string().min(1),
  orderPrc: z.string().min(1),
  wrkDd: z.tuple([z.string().nullable(), z.string().nullable()]),
  insYn: z.enum(["Y", "N"]),
  subMngrYn: z.enum(["Y", "N"]),
  userDcsr: z.string().nullable(),
});

type TWorkerUpdateDto = z.infer<typeof workerUpdateDto>;

interface Props {
  contractData: NonNullable<TWCM200201SSQ01Data>;
  session: Session;
}

export default function WorkerUpdateForm({ contractData, session }: Props) {
  const router = useRouter();
  const editContractMutation = useTCM200201SSP02();
  const cancelContractMutation = useTCM200201SSP03();
  const { data: instData, isPending: isInstDataLoading } = useTCW000100SMQ02({ session });
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [userDscr, setUserDscr] = useState("");
  const [userDscrOther, setUserDscrOther] = useState("");

  const form = useForm<TWorkerUpdateDto>({
    defaultValues: {
      instCd: contractData.instCd,
      orderPrc: addComma(contractData.ordrPrc),
      wrkDd: [contractData.wrkStrDd, contractData.wrkEndDd],
      insYn: contractData.insYn as "Y" | "N",
      subMngrYn: contractData.subMngrYn as "Y" | "N",
      userDcsr: "",
    },
    resolver: zodResolver(workerUpdateDto),
  });

  const handleEditContract = async () => {
    if (editContractMutation.isPending) return;
    const isValid = await form.trigger();
    if (!isValid) return;

    const data = form.getValues();

    if (!data.wrkDd[0] || !data.wrkDd[1]) {
      nativeAlert("근무일자를 선택해주세요.");
      return;
    }

    editContractMutation.mutate(
      {
        mastCorpCd: contractData.mastCorpCd,
        corpCd: contractData.corpCd,
        userId: contractData.userId,
        session,
        cntrStatTp: contractData.cntrStatTp, // 유지
        instCd: data.instCd,
        ordrPrc: data.orderPrc.replaceAll(",", ""),
        wrkStrDd: data.wrkDd[0],
        wrkEndDd: data.wrkDd[1],
        insYn: form.getValues("insYn"),
        subMngrYn: form.getValues("subMngrYn"),
        cntrDd: contractData.cntrDd,
        cntrSn: contractData.cntrSn,
        userDcsr: form.getValues("userDcsr") || "",
      },
      {
        onSuccess: () => {
          nativeAlert("계약 수정이 완료되었습니다.");

          if (!!window.ReactNativeWebView) {
            sendMessageToDevice({
              type: DEVICE_API.crewContractUpdateEnd,
              payload: null,
            });
          } else {
            router.back();
          }
        },
      },
    );
  };

  const handleCancelContract = async () => {
    setShowCancelConfirm(true);
  };

  const confirmCancelContract = async () => {
    if (cancelContractMutation.isPending) return;
    setShowCancelConfirm(false);

    cancelContractMutation.mutate(
      {
        session,
        mastCorpCd: contractData.mastCorpCd,
        corpCd: contractData.corpCd,
        userId: contractData.userId,
        cntrDd: contractData.cntrDd,
        cntrSn: contractData.cntrSn,
        userDscr: userDscr === "기타" ? userDscrOther : userDscr,
      },
      {
        onSuccess: () => {
          if (!!window.ReactNativeWebView) {
            sendMessageToDevice({
              type: DEVICE_API.crewContractCancelEnd,
              payload: null,
            });
          } else {
            router.back();
          }
        },
      },
    );
  };

  const isLeader = session.userId === contractData.userId && session.wrkTp === "1";

  return (
    <div className={css.container}>
      <div className={css.formSection}>
        <div className={css.profileWrapper}>
          <div className={css.profileImageWrapper}>
            <Image
              src={`data:image/jpeg;base64,${contractData.faceImgFile}`}
              alt="계약자 얼굴"
              width={58}
              height={58}
              className={css.profileImage}
              unoptimized
            />
            <div className={css.profileName}>{contractData.userNm}</div>
          </div>

          <div className={css.corpInfoWrapper}>
            <div>{contractData.corpNm}</div>
            <div>{contractData.siteNm}</div>
          </div>
        </div>

        <div className={css.formField}>
          <Controller
            control={form.control}
            name="instCd"
            render={({ field, fieldState }) => (
              <Select
                {...form.register("instCd")}
                label="직종"
                searchable
                required
                data={instData?.map((d) => ({ value: d.instCd, label: d.instNm }))}
                allowDeselect={false}
                onChange={(value) => form.setValue("instCd", value || "")}
                value={form.getValues("instCd")}
                styles={{
                  dropdown: {
                    maxHeight: 250,
                    overflow: "auto",
                    scrollbarWidth: "auto",
                  },
                }}
                disabled={isInstDataLoading}
                placeholder={
                  isInstDataLoading ? "직종 정보를 불러오는 중입니다..." : "직종을 선택해주세요"
                }
              />
            )}
          />
        </div>

        <div className={css.formField}>
          <Controller
            control={form.control}
            name="orderPrc"
            render={({ field, fieldState }) => (
              <div className={css.inputWrapper}>
                <TextInput
                  {...field}
                  label="수당"
                  classNames={{
                    wrapper: css.inputWrapper,
                    label: css.inputLabel,
                    input: css.input,
                  }}
                  onFocus={() => {
                    field.onChange(field.value.replaceAll(",", ""));
                  }}
                  onBlur={(e) => {
                    const formattedValue = addComma(e.target.value);
                    field.onChange(formattedValue);
                  }}
                  placeholder="수당을 입력하세요"
                  error={fieldState.error?.message}
                  leftSection={
                    <div>
                      <DollarSign size={16} />
                    </div>
                  }
                  required
                />
              </div>
            )}
          />
        </div>

        <div className={css.formField}>
          <Controller
            control={form.control}
            name="wrkDd"
            render={({ field, fieldState }) => (
              <DatePickerInput
                type="range"
                label="계약 기간"
                placeholder="YYYY-MM-DD ~ YYYY-MM-DD"
                value={[field.value[0], field.value[1]]}
                onChange={field.onChange}
                popoverProps={{ withinPortal: false }}
                valueFormat="YYYY-MM-DD"
                error={fieldState.error?.message}
                required
                allowSingleDateInRange
                firstDayOfWeek={0}
                labelSeparator="~"
                leftSection={<Calendar size={16} />}
                styles={{
                  input: {
                    // borderRadius: "8px",
                    border: "1px solid #d1d5db",
                    "&:focus": {
                      borderColor: "#3b82f6",
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                    },
                  },
                  label: {
                    fontWeight: 500,
                    color: "#374151",
                    marginBottom: "0.5rem",
                  },
                }}
              />
            )}
          />
        </div>

        <div className={css.formField}>
          <Controller
            control={form.control}
            name="insYn"
            render={({ field, fieldState }) => (
              <div className={css.inputWrapper}>
                <Checkbox
                  {...field}
                  label="보험 여부"
                  type="checkbox"
                  error={fieldState.error?.message}
                  required
                  checked={field.value === "Y"}
                  onChange={(e) => field.onChange(e.target.checked ? "Y" : "N")}
                />
              </div>
            )}
          />
        </div>

        <div className={css.formField}>
          <Controller
            control={form.control}
            name="subMngrYn"
            render={({ field, fieldState }) => (
              <div className={css.inputWrapper}>
                <Checkbox
                  {...field}
                  label="팀장 권한 부여"
                  type="checkbox"
                  // error={fieldState.error?.message}
                  required
                  checked={field.value === "Y"}
                  onChange={(e) => field.onChange(e.target.checked ? "Y" : "N")}
                />
              </div>
            )}
          />
        </div>

        {/* <div className={css.formField}>
          <Controller
            control={form.control}
            name="userDcsr"
            render={({ field, fieldState }) => (
              <div className={css.inputWrapper}>
                <Textarea
                  {...field}
                  label="계약 관련 메모"
                  // error={fieldState.error?.message}
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </div>
            )}
          />
        </div> */}
      </div>

      {/* 서명 섹션 (현재 주석 처리됨) */}
      {/* <div className={css.signatureSection}>
      <div className={css.signatureTitle}>서명</div>
      <div className={css.signatureCanvas}>
        <SignatureCanvas {...eventHandlers} canvasRef={canvasRef} width={200} height={150} />
      </div>
      {hasSignature && (
        <div className={css.signatureButtons}>
          <Button onClick={clearSignature} variant="outline" color="red">
            지우기
          </Button>
          <Button onClick={saveSignature} color="green">
            저장
          </Button>
        </div>
      )}
    </div> */}

      <div className={css.buttonBox}>
        <Button
          type="button"
          onClick={handleEditContract}
          loading={editContractMutation.isPending}
          classNames={{ root: clsx(css.actionButton, css.editButton) }}
        >
          근로조건 변경
        </Button>
        {!isLeader && (
          <Button
            type="button"
            onClick={handleCancelContract}
            loading={cancelContractMutation.isPending}
            classNames={{ root: clsx(css.actionButton, css.cancelButton) }}
          >
            팀원등록 해지
          </Button>
        )}
      </div>

      {(editContractMutation.isPending || cancelContractMutation.isPending) && (
        <div className={css.loadingOverlay}>
          <LoadingOverlay
            visible={editContractMutation.isPending || cancelContractMutation.isPending}
          />
        </div>
      )}

      <AnimatePresence>
        {showCancelConfirm && (
          <Portal id={PORTAL_MODAL_CONTAINER_ID}>
            <CancelConfirmModal
              onClose={() => setShowCancelConfirm(false)}
              onSuccess={confirmCancelContract}
              userDscr={userDscr}
              setUserDscr={setUserDscr}
              userDscrOther={userDscrOther}
              setUserDscrOther={setUserDscrOther}
            />
          </Portal>
        )}
      </AnimatePresence>
    </div>
  );
}
