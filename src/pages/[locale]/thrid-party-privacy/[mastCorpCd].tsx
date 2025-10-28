import { Authorized } from "@/libraries/auth/authorized";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Checkbox } from "@mantine/core";
import css from "./third-party-privacy.module.scss";
import { useTCW000001SSP05 } from "@/hooks/tms/use-authorization";
import clsx from "clsx";
import { nativeAlert, sendMessageToDevice } from "@/hooks/use-device-api";
import { useSession } from "@/libraries/auth/use-session";
import { DEVICE_API } from "@/types/common";

export default function ThirdPartyPrivacyPage() {
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <Authorized>
      <ThirdPartyPrivacyHome />
    </Authorized>
  );
}

function ThirdPartyPrivacyHome() {
  const router = useRouter();
  const mastCorpCd = router.query.mastCorpCd?.toString() || "";
  const [isAgree, setIsAgree] = useState(false);

  const { data: session } = useSession();
  if (!session) throw new Error("Session is not found");

  const TCW000001SSP05 = useTCW000001SSP05();

  // 회사 정보 매핑 (실제로는 API에서 가져올 수 있음)
  const getCompanyInfo = (corpCd: string) => {
    const companies: Record<string, { name: string; description: string }> = {
      CORP001: { name: "ABC 건설", description: "건설 및 토목공사 전문 기업" },
      CORP002: { name: "XYZ 엔지니어링", description: "엔지니어링 및 기술 서비스" },
      CORP003: { name: "DEF 리조트", description: "리조트 및 관광 서비스" },
    };
    return companies[corpCd] || { name: "제3자 기업", description: "외부 협력 기업" };
  };

  const companyInfo = getCompanyInfo(mastCorpCd);

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

  return (
    <div className={"mobileLayout"}>
      <div className={css.container}>
        {/* 헤더 */}
        <div className={css.header}>
          <h1>제3자 개인정보 이용동의</h1>
          <p className={css.subtitle}>개인정보 수집 및 이용에 대한 안내</p>
        </div>

        {/* 회사 정보 */}
        <div className={css.companyInfo}>
          <div className={css.companyName}>{companyInfo.name}</div>
          <div className={css.companyDescription}>{companyInfo.description}</div>
        </div>

        {/* 개인정보 이용 안내 */}
        <div className={css.privacyContent}>
          <div className={css.contentTitle}>개인정보 수집 및 이용 안내</div>

          <div className={css.privacyText}>
            {`귀하의 개인정보는 다음과 같이 수집·이용됩니다.

1. 수집하는 개인정보 항목
   - 성명, 연락처, 주소
   - 신분증 정보 (주민등록번호)
   - 계좌 정보
   - 얼굴 인증 정보

2. 개인정보 수집·이용 목적
   - 본인 확인 및 신원 검증
   - 계약 이행을 위한 서비스 제공
   - 법령에 따른 의무 이행

3. 개인정보 보유·이용 기간
   - 계약 종료 후 3년간 보관
   - 관련 법령에 따른 보존 의무 기간 준수

4. 개인정보 제3자 제공
   - 제공받는 자: ${companyInfo.name}
   - 제공 목적: 계약 이행 및 서비스 제공
   - 제공 항목: 위 수집 항목과 동일`}
          </div>

          <div className={css.highlightBox}>
            <div className={css.highlightTitle}>⚠️ 중요 안내</div>
            <div className={css.highlightText}>
              개인정보 이용에 동의하지 않을 경우 서비스 이용이 제한될 수 있습니다. 동의 철회는
              언제든지 가능하며, 철회 시 해당 서비스 이용이 중단됩니다.
            </div>
          </div>
        </div>

        {/* 동의 섹션 */}
        <div className={css.agreementSection}>
          <div className={css.agreementTitle}>개인정보 이용동의</div>
          <div className={`${css.checkboxContainer} ${isAgree ? css.checked : ""}`}>
            <Checkbox
              label={`${companyInfo.name}에 개인정보를 제공하는 것에 동의합니다.`}
              checked={isAgree}
              onChange={() => setIsAgree((prev) => !prev)}
              size="lg"
            />
          </div>
        </div>

        {/* 버튼 섹션 */}
        <div className={css.buttonSection}>
          <Button
            classNames={{ root: clsx(css.button, css.primary) }}
            onClick={handleAgree("APL")}
            loading={TCW000001SSP05.isPending}
            disabled={!isAgree}
            size="lg"
          >
            {isAgree ? "동의하고 계속하기" : "동의 후 계속 가능"}
          </Button>

          <Button
            classNames={{ root: clsx(css.button, css.secondary) }}
            onClick={handleAgree("REJ")}
            loading={TCW000001SSP05.isPending}
            size="lg"
            mt={10}
          >
            동의하지 않음
          </Button>
        </div>
      </div>
    </div>
  );
}
