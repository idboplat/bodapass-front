import { Authorized } from "@/libraries/auth/authorized";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Checkbox, Loader } from "@mantine/core";
import css from "./third-party-privacy.module.scss";
import { useTCW000001SSP05 } from "@/hooks/tms/use-authorization";
import clsx from "clsx";
import { nativeAlert, sendMessageToDevice } from "@/hooks/use-device-api";
import { useSession } from "@/libraries/auth/use-session";
import { DEVICE_API } from "@/types/common";
import { useTCW000001SSQ05 } from "@/hooks/tms/use-contract";
import { replaceToTelNumber } from "@/utils/regexp";
import PaperIcon from "/public/assets/svg/paper-gray.svg";
import InformationIcon from "/public/assets/svg/information-yellow.svg";
import CustomButton from "@/components/common/custom-button";
import CustomCheckbox from "@/components/common/custom-checkbox";
import CheckIcon from "/public/assets/svg/check.svg";

export default function ThirdPartyPrivacyPage() {
  const router = useRouter();
  const mastCorpCd = router.query.mastCorpCd?.toString() || "";

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <Authorized>
      <ThirdPartyPrivacyHome mastCorpCd={mastCorpCd} />
    </Authorized>
  );
}

function ThirdPartyPrivacyHome({ mastCorpCd }: { mastCorpCd: string }) {
  const router = useRouter();

  const [isAgree, setIsAgree] = useState(false);

  const { data: session } = useSession();
  if (!session) throw new Error("FW401");

  const TCW000001SSQ05 = useTCW000001SSQ05({ session, mastCorpCd });
  const TCW000001SSP05 = useTCW000001SSP05();

  const handleAgree = (cntrStatTp: "APL" | "REJ") => () => {
    if (!isAgree) {
      nativeAlert("개인정보 이용에 동의해주세요.");
      return;
    }

    TCW000001SSP05.mutate(
      {
        session,
        corpCd: mastCorpCd,
        cntrStatTp,
      },
      {
        onSuccess: (data) => {
          if (!!window.ReactNativeWebView) {
            sendMessageToDevice({
              type: DEVICE_API.thirdPartyPrivacyAgreementEnd,
              payload: null,
            });
          }
        },
      },
    );
  };

  if (TCW000001SSQ05.isPending) {
    return (
      <div className={"mobileLayout"}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Loader size="lg" />
        </div>
      </div>
    );
  }

  if (!TCW000001SSQ05.data) {
    return (
      <div className={"mobileLayout"}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div>동의서를 찾을 수 없습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className={"mobileLayout"}>
      <div className={css.container}>
        {/* 헤더 */}
        <div className={css.header}>
          <p className={css.title}>개인정보 수집 및 이용에 대한 안내</p>
        </div>

        {/* 회사 정보 */}
        <div className={css.companyInfo}>
          <div className={css.companyName}>{TCW000001SSQ05.data.corpNm}</div>
          <div className={css.companyDescription}>
            {replaceToTelNumber(TCW000001SSQ05.data.telNo)}
          </div>
        </div>

        {/* 개인정보 이용 안내 */}
        <div className={css.privacyContent}>
          <div className={css.contentTitle}>
            <PaperIcon />
            하루출근 개인정보 처리방침 (V 1.0)
          </div>

          <div className={css.privacyText}>
            주식회사 홍(이하 ‘회사’)은 「개인정보 보호법」 등 관계 법령에 따라 정보주체의 개인정보를
            보호하고, 개인정보 처리와 관련한 고충을 신속하고 원활하게 처리 하기 위하여 다음과 같이
            개인정보 처리방침을 수립·공개합니다.
          </div>

          <div>
            <div className={css.numberTitle}>
              제1조 (개인정보의 처리 목적) 회사는 다음의 목적을 위하여 개인정보를 처리하며, 목적
              이외의 용도로는 사용하지 않습니다.
            </div>
            <div className={css.numberItem}>
              <p className={css.numberTitle}> 1. 근로자 출퇴근 및 근태 관리</p>
              <p className={css.numberText}> - 얼굴인식, GPS 기반 현장 내 출퇴근 확인 </p>
              <p className={css.numberText}> - 부정 출퇴근, 대리 출근 방지 </p>
            </div>
            <div className={css.numberItem}>
              <p className={css.numberTitle}> 2. 노무·급여·법정 신고 업무 처리 </p>
              <p className={css.numberText}> - 근로계약 관리, 임금 정산 </p>
              <p className={css.numberText}> - 4대보험, 퇴직공제, 원천세 등 법정 의무 신고 대행 </p>
            </div>
            <div className={css.numberItem}>
              <p className={css.numberTitle}> 3. 현장 및 사용자 관리 </p>
              <p className={css.numberText}> - 현장별 인력 배치, 실시간 출역 현황 제공 </p>
              <p className={css.numberText}> - 사용자 인증 및 서비스 접근 관리 </p>
            </div>
            <div className={css.numberItem}>
              <p className={css.numberTitle}> 4. 서비스 품질 개선 및 안정성 확보 </p>
              <p className={css.numberText}> - 오류 분석, 보안 로그 관리 </p>
              <p className={css.numberText}> - 시스템 성능 및 장애 대응 </p>
            </div>
            <div className={css.numberItem}>
              <p className={css.numberTitle}> 5. 통계 작성 및 서비스 고도화(가명정보 활용) </p>
              <p className={css.numberText}>
                - 개인을 식별할 수 없도록 가명처리된 정보를 활용한 통계 분석
              </p>
              <p className={css.numberText}> - 서비스 품질 개선, 기능 개발 및 연구 목적 </p>
            </div>
          </div>

          <div className={css.highlightBox}>
            <div className={css.highlightTitle}>
              <InformationIcon /> 중요 안내
            </div>
            <div className={css.highlightText}>
              개인정보 이용에 동의하지 않을 경우 서비스 이용이 제한될 수 있습니다. 동의 철회는
              언제든지 가능하며, 철회 시 해당 서비스 이용이 중단됩니다.
            </div>
          </div>
        </div>

        {TCW000001SSQ05.data.cntrStatTp === "REQ" && (
          <>
            {/* 동의 섹션 */}
            <div className={css.agreementSection}>
              <div className={css.agreementTitle}>
                <CheckIcon width={11} height={8} /> 개인정보 이용동의
              </div>
              <div className={css.checkboxContainer}>
                <CustomCheckbox
                  label="제3자 기업에 개인정보를 제공하는 것에 동의합니다."
                  checked={isAgree}
                  onChange={() => setIsAgree((prev) => !prev)}
                />
              </div>
            </div>

            {/* 버튼 섹션 */}
            <div className={css.buttonSection}>
              <CustomButton
                variant="gray"
                onClick={handleAgree("REJ")}
                disabled={TCW000001SSP05.isPending}
                style={{ borderRadius: "12px", fontSize: "14px", padding: "10px 20px" }}
                fullWidth
              >
                동의하지 않음
              </CustomButton>
              <CustomButton
                onClick={handleAgree("APL")}
                disabled={!isAgree || TCW000001SSP05.isPending}
                style={{ borderRadius: "12px", fontSize: "14px", padding: "10px 20px" }}
                fullWidth
              >
                {isAgree ? "동의하고 계속하기" : "동의 후 계속 가능"}
              </CustomButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
