import { nativeAlert, sendMessageToDevice } from "@/hooks/use-device-api";
import BackHeader from "../common/back-header";
import css from "./privacy-home.module.scss";
import { useSession } from "@/libraries/auth/use-session";
import { useRouter } from "next/router";
import { useTCM200200SSP01, useTCM200801SSQ01, useTCM200801SSQ02 } from "@/hooks/tms/use-worker";
import { Button, Checkbox, Select, TextInput } from "@mantine/core";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { addComma, checkAmount, deleteIntegerZero } from "@/utils/regexp";
import { useTCW000001SSP04, useTCW000100SMQ02 } from "@/hooks/tms/use-authorization";
import { DEVICE_API } from "@/types/common";

export default function CrewPrivacyHome() {
  const router = useRouter();
  /** 근로자의 유저 ID */
  const userId = router.query.userId?.toString() || "";
  const locale = router.query.locale?.toString() || "ko";
  const next = (router.query.next?.toString() || "") as "" | "true" | "webview";

  const [isAgree, setIsAgree] = useState(false);
  const [price, setPrice] = useState("0");
  const [isSaved, setIsSaved] = useState(false);
  const [instCd, setInstCd] = useState("");

  const { data: session } = useSession();
  if (!session) throw new Error("Session is not found");

  const TCW000001SSP04 = useTCW000001SSP04();
  const TCM200801SSQ01 = useTCM200801SSQ01({
    session,
    userId,
  });
  const TCM200801SSQ02 = useTCM200801SSQ02({
    session,
    userId,
  });
  const TCW000100SMQ02 = useTCW000100SMQ02(session);
  const TCM200200SSP01 = useTCM200200SSP01();

  const end = () => {
    if (!!window.ReactNativeWebView) {
      sendMessageToDevice({
        type: DEVICE_API.crewAuthorizationEnd,
        payload: null,
      });
    } else {
      router.back();
    }
  };

  const onSubmit = () => {
    if (!isSaved) {
      nativeAlert("수당을 저장해주세요.");
      return;
    }

    if (!isAgree) {
      nativeAlert("동의해주세요.");
      return;
    }

    TCW000001SSP04.mutate({ session, userId }, { onSuccess: end });
  };

  const onTogglePrice = () => {
    if (TCM200200SSP01.isPending) return;

    if (isSaved) {
      setIsSaved(() => false);
      return;
    }

    if (!instCd) {
      nativeAlert("직종을 선택해주세요.");
      return;
    }

    TCM200200SSP01.mutate(
      {
        session,
        userId,
        price: price.replaceAll(",", ""),
        instCd,
      },
      {
        onSuccess: () => {
          setIsSaved(() => true);
        },
      },
    );
  };

  const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const isValid = checkAmount({
      amount: value,
      maximumNumberLength: 15,
      maximumDecimalLength: 0,
    });

    if (!isValid) return;

    setPrice(() => deleteIntegerZero(value));
  };

  const onFocusPrice = () => {
    setPrice((pre) => pre.replaceAll(",", ""));
  };

  const onBlurPrice = () => {
    setPrice((pre) => addComma(pre.replaceAll(",", "")));
  };

  if (TCM200801SSQ01.isPending || TCM200801SSQ02.isPending) {
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

      {TCM200801SSQ01.data && TCM200801SSQ02.data ? (
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
                <span className={css.infoLabel}>이름</span>
                <span className={css.infoValue}>{TCM200801SSQ01.data.userNm}</span>
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
                    TCM200801SSQ02.data.faceRgstYn === "Y" ? css.verified : css.unverified
                  }`}
                >
                  {TCM200801SSQ02.data.faceRgstYn === "Y" ? "인증 완료" : "미인증"}
                </span>
              </div>
              <Link
                href={`/${locale}/authorization/leader/${userId}/face?next=webview`}
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
                    TCM200801SSQ02.data.acctCetYn === "Y" ? css.verified : css.unverified
                  }`}
                >
                  {TCM200801SSQ02.data.acctCetYn === "Y" ? "인증 완료" : "미인증"}
                </span>
              </div>
              {TCM200801SSQ02.data.acctCetYn === "Y" && (
                <>
                  <div className={css.infoRow}>
                    <span className={css.infoLabel}>은행명</span>
                    <span className={css.infoValue}>
                      {TCM200801SSQ02.data.bankNm} ({TCM200801SSQ02.data.bankCd})
                    </span>
                  </div>
                  <div className={css.infoRow}>
                    <span className={css.infoLabel}>계좌번호</span>
                    <span className={css.infoValue}>{TCM200801SSQ02.data.bankAcctNo}</span>
                  </div>
                </>
              )}
              <Link
                href={`/${locale}/authorization/leader/${userId}/bank?next=webview`}
                className={css.editButton}
              >
                통장 수정
              </Link>
            </div>
          </div>

          {/* 수당 섹션 */}
          <div className={css.priceSection}>
            <div className={css.priceTitle}>직종</div>
            <Select
              value={instCd}
              onChange={(value) => setInstCd(value || "")}
              data={TCW000100SMQ02.data?.map((d) => ({ value: d.instCd, label: d.instNm }))}
              allowDeselect={false}
              placeholder="직종을 선택해주세요"
              disabled={TCW000100SMQ02.isPending}
              styles={{
                dropdown: {
                  maxHeight: 250,
                  overflow: "auto",
                  scrollbarWidth: "auto",
                },
              }}
            />

            <div className={css.priceTitle} style={{ marginTop: "1rem" }}>
              기본수당 (원)
            </div>
            <TextInput
              value={price}
              classNames={{ root: css.priceInput }}
              onChange={onChangePrice}
              size="lg"
              onFocus={onFocusPrice}
              onBlur={onBlurPrice}
              disabled={TCM200200SSP01.isPending || isSaved}
              rightSection={
                <div>
                  <Button size="xs" loading={TCM200200SSP01.isPending} onClick={onTogglePrice}>
                    {isSaved ? "수정" : "저장"}
                  </Button>
                </div>
              }
            />
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
