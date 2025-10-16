import { Button, LoadingOverlay, TextInput } from "@mantine/core";
import { Building, MapPin, User, FileText, DollarSign, Calendar, Send } from "lucide-react";
import css from "./crew-conclude.module.scss";
import { nativeAlert, sendMessageToDevice } from "@/hooks/use-device-api";
import { SignatureCanvas } from "./signature-canvas";
import { useSignature } from "@/hooks/use-signature";
import { useTCM200200SSP02 } from "@/hooks/tms/use-contract";
import { DEVICE_API } from "@/types/common";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { DatePickerInput } from "@mantine/dates";

const crewConcludeDto = z.object({
  siteId: z.string(),
  instCd: z.string().min(1),
  orderPrc: z.string().min(1),
  wrkDd: z.tuple([z.string().nullable(), z.string().nullable()]),
});

type TCrewConcludeDto = z.infer<typeof crewConcludeDto>;

interface Props {
  session: Session;
  mastCorpCd: string;
  corpCd: string;
  userId: string;
}

export default function CrewConclude({ session, mastCorpCd, corpCd, userId }: Props) {
  const router = useRouter();

  const { canvasRef, hasSignature, clearSignature, saveSignature, eventHandlers } = useSignature({
    width: 200,
    height: 100,
    onSignatureChange: (data) => {
      // 서명 데이터가 변경될 때 필요한 로직
      console.log("서명 데이터 변경:", data ? "서명됨" : "지워짐");
    },
  });

  const mutation = useTCM200200SSP02();
  const form = useForm<TCrewConcludeDto>({
    defaultValues: {
      siteId: "",
      instCd: "",
      orderPrc: "",
      wrkDd: [null, null],
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
        mastCorpCd,
        corpCd,
        userId,
        session,
        instCd: data.instCd,
        ordrPrc: data.orderPrc,
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
            <span className={css.value}>{mastCorpCd}</span>
          </div>
          <div className={css.infoRow}>
            <span className={css.label}>
              <MapPin size={16} />
              현장코드
            </span>
            <span className={css.value}>{corpCd}</span>
          </div>
          <div className={css.infoRow}>
            <span className={css.label}>
              <User size={16} />
              수령인
            </span>
            <span className={css.value}>{userId}</span>
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
              <TextInput
                {...field}
                label="종목 코드"
                placeholder="종목 코드를 입력하세요"
                error={fieldState.error?.message}
                required
                classNames={{
                  wrapper: css.inputWrapper,
                  label: css.inputLabel,
                  input: css.input,
                }}
                leftSection={
                  <div>
                    <FileText size={16} />
                  </div>
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
