import { Button, LoadingOverlay } from "@mantine/core";
import { Building, MapPin, Calendar, DollarSign, Shield, User, X, Check } from "lucide-react";
import css from "./leader-conclude.module.scss";
import { sendMessageToDevice } from "@/hooks/use-device-api";
import { SignatureCanvas } from "./signature-canvas";
import { useSignature } from "@/hooks/use-signature";
import { TTCM200201SMQ01RowData, useTCM200201SSP01 } from "@/hooks/tms/use-contract";

interface Props {
  contractData: TTCM200201SMQ01RowData;
  session: Session;
}

export function LeaderConclude({ contractData, session }: Props) {
  const { canvasRef, hasSignature, clearSignature, saveSignature, eventHandlers } = useSignature({
    width: 200,
    height: 100,
    onSignatureChange: (data) => {
      // 서명 데이터가 변경될 때 필요한 로직
      console.log("서명 데이터 변경:", data ? "서명됨" : "지워짐");
    },
  });

  const mutation = useTCM200201SSP01();

  const onClick = (type: "REJ" | "APL") => () => {
    if (mutation.isPending) return;

    mutation.mutate(
      {
        mastCorpCd: contractData.mastCorpCd,
        corpCd: contractData.corpCd,
        userId: contractData.userId,
        type,
        session,
      },
      {
        onSuccess: (data) => {
          if (!!window.ReactNativeWebView) {
            sendMessageToDevice({
              type: "leaderContractEnd",
              payload: null,
            });
          }
        },
      },
    );
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.subtitle}>계약 내용을 확인하고 승인 또는 반려를 선택해주세요</div>
      </div>

      <div className={css.infoSection}>
        <div className={css.sectionTitle}>
          <Building size={20} />
          회사 및 현장 정보
        </div>
        <div className={css.infoCard}>
          <div className={css.infoRow}>
            <span className={css.label}>
              <Building size={16} />
              회사명
            </span>
            <span className={css.value}>{contractData.corpNm}</span>
          </div>
          <div className={css.infoRow}>
            <span className={css.label}>회사코드</span>
            <span className={css.value}>{contractData.mastCorpCd}</span>
          </div>
          <div className={css.infoRow}>
            <span className={css.label}>
              <MapPin size={16} />
              현장명
            </span>
            <span className={css.value}>{contractData.siteNm}</span>
          </div>
          <div className={css.infoRow}>
            <span className={css.label}>현장코드</span>
            <span className={css.value}>{contractData.corpCd}</span>
          </div>
        </div>
      </div>

      <div className={css.infoSection}>
        <div className={css.sectionTitle}>
          <Calendar size={20} />
          계약 상세 정보
        </div>
        <div className={`${css.infoCard} ${css.contractInfo}`}>
          <div className={css.infoRow}>
            <span className={css.label}>
              <DollarSign size={16} />
              계약금액
            </span>
            <span className={`${css.value} ${css.price}`}>
              {contractData.ordrPrc ? `${Number(contractData.ordrPrc).toLocaleString()}원` : "미정"}
            </span>
          </div>
          <div className={css.infoRow}>
            <span className={css.label}>종목코드</span>
            <span className={css.value}>{contractData.instCd}</span>
          </div>
          <div className={css.infoRow}>
            <span className={css.label}>
              <Shield size={16} />
              보험여부
            </span>
            <span className={`${css.value} ${css.insurance}`}>
              {contractData.insYn ? "보험 적용" : "보험 미적용"}
            </span>
          </div>
          <div className={css.infoRow}>
            <span className={css.label}>
              <Calendar size={16} />
              계약시작일
            </span>
            <span className={`${css.value} ${css.date}`}>{contractData.wrkStrDd}</span>
          </div>
          <div className={css.infoRow}>
            <span className={css.label}>
              <Calendar size={16} />
              계약종료일
            </span>
            <span className={`${css.value} ${css.date}`}>{contractData.wrkEndDd}</span>
          </div>
          <div className={css.infoRow}>
            <span className={css.label}>생성자</span>
            <span className={css.value}>{contractData.creWrkId}</span>
          </div>
        </div>
      </div>

      <div className={css.recipientSection}>
        <div className={css.recipientLabel}>
          <User size={16} />
          계약 수령인
        </div>
        <div className={css.recipientValue}>{contractData.userId}</div>
      </div>

      {/* 서명 섹션 (현재 주석 처리됨) */}
      {/* <div className={css.signatureSection}>
        <div className={css.signatureTitle}>서명</div>
        <div className={css.signatureCanvas}>
          <SignatureCanvas {...eventHandlers} canvasRef={canvasRef} width={200} height={100} />
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
          onClick={onClick("REJ")}
          classNames={{ root: css.button }}
          loading={mutation.isPending}
          leftSection={<X size={20} />}
        >
          반려
        </Button>
        <Button
          onClick={onClick("APL")}
          classNames={{ root: css.button }}
          loading={mutation.isPending}
          leftSection={<Check size={20} />}
        >
          승인
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
