import { nativeAlert, sendMessageToDevice } from "@/hooks/use-device-api";
import BackHeader from "../common/back-header";
import css from "./privacy-home.module.scss";
import { useSession } from "@/libraries/auth/use-session";
import { useTCM200801SSQ01 } from "@/hooks/tms/use-worker";
import { useRouter } from "next/router";
import { Button, Checkbox } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";

export default function LeaderPrivacyHome() {
  const router = useRouter();
  const locale = router.query.locale?.toString() || "ko";

  const [isAgree, setIsAgree] = useState(false);

  const { data: session } = useSession();
  if (!session) throw new Error("Session is not found");
  /** 반장의 유저 ID */
  const userId = session.userId;

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

    end();
  };

  return (
    <div className={"mobileLayout"}>
      <BackHeader title="개인정보이용동의" onClickBack={end} />
      {TCM200801SSQ01.data && (
        <div>
          {/* 신분증 등록 */}
          <div>
            <div>주민등록번호: {TCM200801SSQ01.data.idNo}</div>
            <div>연락처: {TCM200801SSQ01.data.telNo}</div>
            <div>
              <p>
                주소: {TCM200801SSQ01.data.addr} ({TCM200801SSQ01.data.zipCd})
              </p>
              <p>상세주소: {TCM200801SSQ01.data.addrDtil}</p>
            </div>

            <div>
              <Link href={`/${locale}/authorization/leader/${userId}/id-card`}>신분증 수정</Link>
            </div>
          </div>

          <div>
            {/* 얼굴 등록 */}
            <div>얼굴등록여부: {TCM200801SSQ01.data.faceRgstYn === "Y" ? "인증" : "미인증"}</div>
            <div>
              <Link href={`/${locale}/authorization/leader/${userId}/face`}>얼굴 수정</Link>
            </div>
          </div>

          <div>
            {/* 통장 등록 */}
            <div>통장등록여부: {TCM200801SSQ01.data.acctCetYn === "Y" ? "인증" : "미인증"}</div>
            <div>
              은행명: {TCM200801SSQ01.data.bankNm} ({TCM200801SSQ01.data.bankCd})
            </div>
            <div>계좌번호: {TCM200801SSQ01.data.bankAcctNo}</div>

            <div>
              <Link href={`/${locale}/authorization/leader/${userId}/bank`}>통장 수정</Link>
            </div>
          </div>

          <div>
            <Checkbox
              label="동의합니다."
              checked={isAgree}
              onChange={() => setIsAgree((prev) => !prev)}
            />
          </div>

          <div>
            <Button onClick={onSubmit}>제출</Button>
          </div>
        </div>
      )}
    </div>
  );
}
