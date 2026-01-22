import CustomButton from "@/components/common/custom-button";
import { useTCM200001SMQ01 } from "@/hooks/tms/use-auth";
import { LoadingOverlay } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useFormContext, useWatch } from "react-hook-form";
import { TFindIdForm } from "@/pages/[locale]/find-id";
import css from "./result-id.module.scss";
import KakaoIcon from "/public/assets/svg/kakao-icon.svg";
import dayjs from "@/libraries/dayjs";

export default function ResultId() {
  const router = useRouter();
  const { t } = useTranslation();

  const locale = router.query.locale?.toString() || "ko";

  const form = useFormContext<TFindIdForm>();

  const [userNm, idNo, telNo, cetTp, cetNo] = useWatch({
    control: form.control,
    name: ["userNm", "idNo", "telNo", "cetTp", "cetNo"],
  });

  const idResults = useTCM200001SMQ01({
    userNm,
    idNo,
    telNo,
    cetTp,
    cetNo,
  });

  const idAccountList = idResults.data?.filter((item) => item.loginTp !== "2") || [];
  const socialAccountList = idResults.data?.filter((item) => item.loginTp === "2") || [];

  if (idResults.isPending && idResults.isError === false) {
    return <LoadingOverlay visible />;
  }

  if (idResults.isError) {
    return (
      <div className={css.errorWrap}>
        <div className={css.errorMessageBox}>
          <p>{idResults.error.message}</p>
        </div>

        <div className={css.errorButtonBox}>
          <button
            onClick={() => {
              form.setValue("cetNo", ""); // 인증번호 초기화
              router.replace(`/${locale}/find-id/?step=1`);
            }}
          >
            이전으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={css.wrap}>
        <div className={css.inner}>
          <h3>
            아이디가 <span>{idResults.data?.length}건</span> 검색되었습니다.
          </h3>

          {/* 아이디 계정 리스트 */}
          {idAccountList.length > 0 && (
            <div className={css.userInfoBox}>
              <div>
                <p>· 동명이인이 있을경우, 본인 외의 ID가 노출될 수 있습니다.</p>
                {/* <p>· 개인정보보호를 위해 일부분은 *로 표시됩니다.</p> */}
              </div>

              {idAccountList.map((item) => (
                <div key={item.extnUserId}>
                  <span>
                    {item.extnUserId} (가입일: {dayjs(item.creWrkDtm).format("YYYY-MM-DD")})
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* 소셜 계정 리스트 */}
          {socialAccountList.length > 0 && (
            <div className={css.userInfoBox}>
              <div>
                <p>· 동명이인이 있을경우, 본인 외의 ID가 노출될 수 있습니다.</p>
                {/* <p>· 개인정보보호를 위해 일부분은 *로 표시됩니다.</p> */}
              </div>

              {socialAccountList.map((item) => (
                <div key={item.extnUserId}>
                  <div className={css.iconBox}>
                    <KakaoIcon width={14} height={14} />
                  </div>
                  <span>
                    소셜로그인 {item.extnUserId} (가입일:{" "}
                    {dayjs(item.creWrkDtm).format("YYYY-MM-DD")})
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className={css.buttonBox}>
            <CustomButton
              style={{ borderRadius: "0px" }}
              fullWidth
              onClick={() => {
                router.replace(`/${locale}/find-pw/?step=1`);
              }}
            >
              비밀번호 찾기
            </CustomButton>
          </div>
        </div>
      </div>
    </>
  );
}
