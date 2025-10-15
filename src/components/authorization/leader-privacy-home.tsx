import { nativeAlert, sendMessageToDevice } from "@/hooks/use-device-api";
import BackHeader from "../common/back-header";
import css from "./privacy-home.module.scss";
import { useSession } from "@/libraries/auth/use-session";
import { useTCM200801SSQ01 } from "@/hooks/tms/use-worker";
import { useRouter } from "next/router";
import { Checkbox } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import { useTCW000001SSP04 } from "@/hooks/tms/use-authorization";

export default function LeaderPrivacyHome() {
  const router = useRouter();

  const locale = router.query.locale?.toString() || "ko";
  const next = (router.query.next?.toString() || "") as "" | "true" | "webview";

  const [isAgree, setIsAgree] = useState(false);

  const { data: session } = useSession();
  if (!session) throw new Error("Session is not found");

  /** 반장의 유저 ID */
  const userId = session.userId;

  const TCW000001SSP04 = useTCW000001SSP04();
  const TCM200801SSQ01 = useTCM200801SSQ01({
    session,
    userId,
  });

  const end = () => {
    if (!!window.ReactNativeWebView) {
      sendMessageToDevice({
        type: "authorizationEnd",
        payload: null,
      });
    } else {
      router.back();
    }
  };

  const onSubmit = () => {
    if (!isAgree) {
      nativeAlert("동의해주세요.");
      return;
    }

    TCW000001SSP04.mutate({ session, userId }, { onSuccess: end });
  };

  if (TCM200801SSQ01.isPending) {
    return (
      <div className={"mobileLayout"}>
        <BackHeader title="개인정보이용동의" onClickBack={end} />
        <div className={css.loadingState}>개인정보를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className={"mobileLayout"}>
      <BackHeader title="개인정보이용동의" onClickBack={end} />

      {TCM200801SSQ01.data ? (
        <div className={css.container}>
          <div className={css.header}>
            <h2>아래 정보를 확인하고 개인정보 이용에 동의해주세요</h2>
          </div>

          {/* 신분증 정보 */}
          <div className={css.infoSection}>
            <div className={css.sectionTitle}>🆔 신분증 정보</div>
            <div className={css.infoCard}>
              <div className={css.infoRow}>
                <span className={css.infoLabel}>주민등록번호</span>
                <span className={css.infoValue}>{TCM200801SSQ01.data.idNo}</span>
              </div>
              <div className={css.infoRow}>
                <span className={css.infoLabel}>연락처</span>
                <span className={css.infoValue}>{TCM200801SSQ01.data.telNo}</span>
              </div>
              <div className={css.infoRow}>
                <span className={css.infoLabel}>주소</span>
                <span className={css.infoValue}>
                  {TCM200801SSQ01.data.addr} ({TCM200801SSQ01.data.zipCd})
                </span>
              </div>
              <div className={css.infoRow}>
                <span className={css.infoLabel}>상세주소</span>
                <span className={css.infoValue}>{TCM200801SSQ01.data.addrDtil}</span>
              </div>
              <Link
                href={`/${locale}/authorization/leader/id-card?next=webview`}
                className={css.editButton}
              >
                신분증 수정
              </Link>
            </div>
          </div>

          {/* 얼굴 인증 정보 */}
          <div className={css.infoSection}>
            <div className={css.sectionTitle}>👤 얼굴 인증</div>
            <div className={css.infoCard}>
              <div className={css.infoRow}>
                <span className={css.infoLabel}>인증 상태</span>
                <span
                  className={`${css.statusBadge} ${
                    TCM200801SSQ01.data.faceRgstYn === "Y" ? css.verified : css.unverified
                  }`}
                >
                  {TCM200801SSQ01.data.faceRgstYn === "Y" ? "인증 완료" : "미인증"}
                </span>
              </div>
              <Link
                href={`/${locale}/authorization/leader/face?next=webview`}
                className={css.editButton}
              >
                얼굴 수정
              </Link>
            </div>
          </div>

          {/* 통장 정보 */}
          <div className={css.infoSection}>
            <div className={css.sectionTitle}>🏦 통장 정보</div>
            <div className={css.infoCard}>
              <div className={css.infoRow}>
                <span className={css.infoLabel}>인증 상태</span>
                <span
                  className={`${css.statusBadge} ${
                    TCM200801SSQ01.data.acctCetYn === "Y" ? css.verified : css.unverified
                  }`}
                >
                  {TCM200801SSQ01.data.acctCetYn === "Y" ? "인증 완료" : "미인증"}
                </span>
              </div>
              {TCM200801SSQ01.data.acctCetYn === "Y" && (
                <>
                  <div className={css.infoRow}>
                    <span className={css.infoLabel}>은행명</span>
                    <span className={css.infoValue}>
                      {TCM200801SSQ01.data.bankNm} ({TCM200801SSQ01.data.bankCd})
                    </span>
                  </div>
                  <div className={css.infoRow}>
                    <span className={css.infoLabel}>계좌번호</span>
                    <span className={css.infoValue}>{TCM200801SSQ01.data.bankAcctNo}</span>
                  </div>
                </>
              )}
              <Link
                href={`/${locale}/authorization/leader/bank?next=webview`}
                className={css.editButton}
              >
                통장 수정
              </Link>
            </div>
          </div>

          {/* 동의 섹션 */}
          <div className={css.agreementSection}>
            <div className={css.agreementTitle}>개인정보 이용동의</div>
            <div className={`${css.checkboxContainer} ${isAgree ? css.checked : ""}`}>
              <Checkbox
                label="위 개인정보 수집 및 이용에 동의합니다."
                checked={isAgree}
                onChange={() => setIsAgree((prev) => !prev)}
                size="lg"
              />
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className={css.submitSection}>
            <button className={css.submitButton} onClick={onSubmit} disabled={!isAgree}>
              {isAgree ? "동의하고 제출하기" : "동의 후 제출 가능"}
            </button>
          </div>
        </div>
      ) : (
        <div className={css.loadingState}>개인정보를 불러올 수 없습니다.</div>
      )}
    </div>
  );
}
