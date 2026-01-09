import { useRouter } from "next/router";
import css from "./find-id.module.scss";
import { useTranslation } from "next-i18next";
import { TextInput } from "@mantine/core";
import clsx from "clsx";

export default function Page() {
  const router = useRouter();
  const { t } = useTranslation();

  const locale = router.query.locale?.toString() || "ko";

  return (
    <div className={"mobileLayout"}>
      <div className={css.wrap}>
        <div className={css.inner}>
          <div className={css.form}>
            <div className={css.tab}>
              <button>
                <span>휴대폰 번호로 찾기</span>
                <div className={css.active} />
              </button>
              <button disabled>
                <span>{/* 이메일 주소로 찾기 */}</span>
                {/* <div className={css.active} /> */}
              </button>
            </div>

            <div className={css.tabBody}>
              <h3>회원가입 시 등록한 정보를 입력해주세요.</h3>

              <div className={css.userInfoBox}>
                <div>
                  <TextInput variant="unstyled" type="text" placeholder="이름" />
                </div>
                <div>
                  <TextInput variant="unstyled" type="text" placeholder="연락처" />
                </div>
                <div>
                  <button>인증번호 요청</button>
                </div>
              </div>

              <div className={clsx(css.verificationCodeBox, css.disabled)}>
                <TextInput variant="unstyled" type="text" placeholder="인증번호 요청" disabled />
              </div>

              <div className={css.verificationCodeButtonBox}>
                <button>인증 확인</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
