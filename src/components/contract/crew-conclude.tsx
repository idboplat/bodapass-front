import { Button, Checkbox, LoadingOverlay, Select, TextInput } from "@mantine/core";
import { Building, MapPin, User, FileText, DollarSign, Calendar, Send } from "lucide-react";
import css from "./crew-conclude.module.scss";
import { nativeAlert, sendMessageToDevice } from "@/hooks/use-device-api";
import { SignatureCanvas } from "./signature-canvas";
import { useSignature } from "@/hooks/use-signature";
import { TTCM200202SSQ01Data, useTCM200200SSP02 } from "@/hooks/tms/use-contract";
import { DEVICE_API } from "@/types/common";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { DatePickerInput } from "@mantine/dates";
import { useTCW000100SMQ02 } from "@/hooks/tms/use-master";
import { addComma } from "@/utils/regexp";
import { roundDecimal } from "@/utils/number-formatter";

const crewConcludeDto = z.object({
  instCd: z.string().min(1),
  orderPrc: z.string().min(1),
  wrkDd: z.tuple([z.string().nullable(), z.string().nullable()]),
  insYn: z.enum(["Y", "N"]),
  subMngrYn: z.enum(["Y", "N"]),
});

type TCrewConcludeDto = z.infer<typeof crewConcludeDto>;

interface Props {
  session: Session;
  contractData: NonNullable<TTCM200202SSQ01Data>;
}

export default function CrewConclude({ session, contractData }: Props) {
  const router = useRouter();

  const { canvasRef, hasSignature, clearSignature, saveSignature, eventHandlers } = useSignature({
    width: 200,
    height: 100,
    onSignatureChange: (data) => {
      // 서명 데이터가 변경될 때 필요한 로직
      console.log("서명 데이터 변경:", data ? "서명됨" : "지워짐");
    },
  });

  const { data: instData, isPending: isInstDataLoading } = useTCW000100SMQ02({ session });

  const mutation = useTCM200200SSP02();

  const ordrPrcWithDecimal = roundDecimal({
    num: Number(contractData.ordrPrc) || 0,
    decimalLength: 0,
    requireComma: true,
  });

  const form = useForm<TCrewConcludeDto>({
    defaultValues: {
      instCd: contractData.instCd,
      orderPrc: ordrPrcWithDecimal,
      wrkDd: [contractData.wrkStrDd, contractData.wrkEndDd],
      insYn: contractData.insYn as "Y" | "N",
      subMngrYn: "N", // 기본값은 N으로 함.
    },
    resolver: zodResolver(crewConcludeDto),
  });

  const onSubmit = async () => {
    if (mutation.isPending) return;
    const isValid = await form.trigger();
    if (!isValid) return;

    const data = form.getValues();

    if (!data.wrkDd[0] || !data.wrkDd[1]) {
      nativeAlert("근무일자를 선택해주세요.");
      return;
    }

    mutation.mutate(
      {
        mastCorpCd: contractData.mastCorpCd,
        corpCd: contractData.corpCd,
        userId: contractData.userId,
        session,
        instCd: data.instCd,
        ordrPrc: data.orderPrc.replaceAll(",", ""),
        wrkStrDd: data.wrkDd[0],
        wrkEndDd: data.wrkDd[1],
        insYn: form.getValues("insYn"),
        subMngrYn: form.getValues("subMngrYn"),
      },
      {
        onSuccess: (data) => {
          if (!!window.ReactNativeWebView) {
            sendMessageToDevice({
              type: DEVICE_API.crewContractEnd,
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
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.title}>팀원 계약 작성</div>
      </div>

      <div className={css.formSection}>
        <div className={css.infoRow}>
          <div className={css.label}>
            <MapPin size={16} />
            <span>현장명</span>
          </div>
          <div className={css.value}>{contractData.siteNm}</div>
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
                label="작업 일자"
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
                    borderRadius: "8px",
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
                  error={fieldState.error?.message}
                  required
                  checked={field.value === "Y"}
                  onChange={(e) => field.onChange(e.target.checked ? "Y" : "N")}
                />
              </div>
            )}
          />
        </div>
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
          onClick={onSubmit}
          loading={mutation.isPending}
          classNames={{ root: css.submitButton }}
          leftSection={<Send size={20} />}
        >
          계약 제출
        </Button>
      </div>

      {mutation.isPending && (
        <div className={css.loadingOverlay}>
          <LoadingOverlay visible={mutation.isPending} />
        </div>
      )}
    </div>
  );
}
