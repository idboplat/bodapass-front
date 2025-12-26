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
          <h1>제3자 개인정보 이용동의</h1>
          <p className={css.subtitle}>개인정보 수집 및 이용에 대한 안내</p>
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
   - 제공받는 자: ${TCW000001SSQ05.data.corpNm}
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

        {TCW000001SSQ05.data.cntrStatTp === "REQ" && (
          <>
            {/* 동의 섹션 */}
            <div className={css.agreementSection}>
              <div className={css.agreementTitle}>개인정보 이용동의</div>
              <div className={`${css.checkboxContainer} ${isAgree ? css.checked : ""}`}>
                <Checkbox
                  label={`${TCW000001SSQ05.data.corpNm}에 개인정보를 제공하는 것에 동의합니다.`}
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
          </>
        )}
      </div>
    </div>
  );
}
