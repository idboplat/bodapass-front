import { Button, LoadingOverlay, Select, TextInput } from "@mantine/core";
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
import { useTCW000100SMQ02 } from "@/hooks/tms/use-authorization";
import { addComma } from "@/utils/regexp";
import { roundDecimal } from "@/utils/number-formatter";

const crewConcludeDto = z.object({
  instCd: z.string().min(1),
  orderPrc: z.string().min(1),
  wrkDd: z.tuple([z.string().nullable(), z.string().nullable()]),
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

  const { data: instData, isPending: isInstDataLoading } = useTCW000100SMQ02(session);

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
        <div className={css.subtitle}>계약 정보를 입력하고 제출해주세요</div>
      </div>

      <div className={css.infoSection}>
        <div className={css.sectionTitle}>
          <Building size={20} />
          계약 기본 정보
        </div>
        <div className={css.infoCard}>
          <div className={css.infoRow}>
            <span className={css.label}>
              <Building size={16} />
              회사코드
            </span>
            <span className={css.value}>{contractData.mastCorpCd}</span>
          </div>
          <div className={css.infoRow}>
            <span className={css.label}>
              <Building size={16} />
              회사명
            </span>
            <span className={css.value}>{contractData.corpNm}</span>
          </div>
          <div className={css.infoRow}>
            <span className={css.label}>
              <Building size={16} />
              회사 전화번호
            </span>
            <span className={css.value}>{contractData.telNo}</span>
          </div>
          <div className={css.infoRow}>
            <span className={css.label}>
              <MapPin size={16} />
              현장 코드
            </span>
            <span className={css.value}>{contractData.corpCd}</span>
          </div>
          <div className={css.infoRow}>
            <span className={css.label}>
              <MapPin size={16} />
              현장명
            </span>
            <span className={css.value}>{contractData.siteNm}</span>
          </div>
          <div className={css.infoRow}>
            <span className={css.label}>
              <MapPin size={16} />
              현장 주소 1
            </span>
            <span className={css.value}>{contractData.siteAddr}</span>
          </div>
          <div className={css.infoRow}>
            <span className={css.label}>
              <MapPin size={16} />
              현장 주소 2
            </span>
            <span className={css.value}>{contractData.siteAddrDtil}</span>
          </div>
          <div className={css.infoRow}>
            <span className={css.label}>
              <MapPin size={16} />
              현장 전화번호
            </span>
            <span className={css.value}>{contractData.siteTelNo}</span>
          </div>
          <div className={css.infoRow}>
            <span className={css.label}>
              <User size={16} />
              계약자
            </span>
            <span className={css.value}>{contractData.userNm}</span>
          </div>
          <div className={css.infoRow}>
            <span className={css.label}>
              <User size={16} />
              계약자 코드
            </span>
            <span className={css.value}>{contractData.userId}</span>
          </div>
        </div>
      </div>

      <div className={css.formSection}>
        <div className={css.formTitle}>
          <FileText size={20} />
          계약 상세 정보 입력
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
