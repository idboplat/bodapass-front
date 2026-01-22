import css from "./privacy.module.scss";
import PaperIcon from "/public/assets/svg/paper-gray.svg";

export default function Privacy() {
  return (
    <div className={"mobileLayout"}>
      <div className={css.container}>
        <div className={css.header}>
          <h1 className={css.title}>개인정보 처리방침</h1>
          <p className={css.subtitle}>얼굴인식을 통한 출퇴근 관리 서비스</p>
        </div>

        <section className={css.intro}>
          <h2>
            <PaperIcon /> 하루출근 개인정보 처리방침 (V 1.0
          </h2>
          <p>
            <strong>[주식회사 홍]</strong>(이하 &quot;회사&quot;)은 「개인정보 보호법」 등 관련
            법령을 준수하며, 이용자의 개인정보를 안전하게 보호하기 위하여 다음과 같이 개인정보
            처리방침을 수립 공개합니다. 본 방침은 얼굴인식 기반 출퇴근 관리 서비스와 관련하여
            적용됩니다.
          </p>
        </section>

        <div className={css.card}>
          <section className={css.section}>
            <div className={css.sectionTop}>
              <h2>제 1조 개인정보의 처리 목적</h2>
            </div>
            <hr />
            <div className={css.sectionBottom}>
              <h3>
                회사는 다음의 목적을 위하여 개인정보를 처리하며, 목적 이외의 용도로는 사용하지
                않습니다.
              </h3>
              <div className={css.sectionItem}>
                <h4>1. 근로자 출퇴근 및 근태 관리</h4>
                <p>- 얼굴인식, GPS 기반 현장 내 출퇴근 확인</p>
                <p>- 부정 출퇴근, 대리 출근 방지</p>
              </div>
              <div className={css.sectionItem}>
                <h4>2. 노무·급여·법정 신고 업무 처리</h4>
                <p>- 근로계약 관리, 임금 정산</p>
                <p>- 4대보험, 퇴직공제, 원천세 등 법정 의무 신고 대행</p>
              </div>
              <div className={css.sectionItem}>
                <h4>3. 현장 및 사용자 관리</h4>
                <p>- 현장별 인력 배치, 실시간 출역 현황 제공</p>
                <p>- 사용자 인증 및 서비스 접근 관리</p>
              </div>
              <div className={css.sectionItem}>
                <h4>4. 서비스 품질 개선 및 안정성 확보</h4>
                <p>- 오류 분석, 보안 로그 관리</p>
                <p>- 시스템 성능 및 장애 대응</p>
              </div>
            </div>
          </section>

          <section className={css.section}>
            <h2>제 2조 처리하는 개인정보의 항목</h2>

            <div className={css.infoList}>
              <div className={css.infoItem}>
                <h3>1. 법정 의무 이행을 위한 필수 정보</h3>
                <p>- 이름, 생년월일, 주민등록번호(법정 의무 신고용)</p>
                <p>
                  - 휴대전화번호 - 직종, 일당, 근로일수 등 근로계약 관련 정보2. 서비스 제공을 위한
                  선택 정보
                </p>
                <p>- 신분증 OCR스캔정보(자동 입력 목적)</p>
              </div>
              <div className={css.infoItem}>
                <h3>2. 민감정보</h3>
                <p>- 얼굴 식별 특징값(특징 벡터)</p>
              </div>
              <div className={css.infoItem}>
                <h3>3. 위치정보</h3>
                <p>- GPS 기반 출퇴근 인증 위치 정보</p>
              </div>
              <div className={css.infoItem}>
                <h3>4. 자동 수집 정보</h3>
                <p>- 기기 고유번호(UUID), 접속 로그, 서비스 이용 기록</p>
              </div>
            </div>
          </section>

          <section className={css.section}>
            <div className={css.sectionTop}>
              <h2>제3조 (민감정보 처리에 관한 사항)</h2>
            </div>
            <hr />
            <div className={css.sectionBottom}>
              <h3>
                얼굴 인식 정보 및 출퇴근 기록은 관계 법령(예: 「근로기준법」, 「국세기본법」,
                「전자상거래 등에서의 소비자 보호에 관한 법률」)에 따른 보존 의무가 있는 경우 해당
                기간 동안 보관합니다. 보존 기간이 경과하거나 목적이 달성된 경우 지체 없이
                파기합니다.
              </h3>

              <p>
                1. 회사는 얼굴인식 정보 등 민감정보를 출퇴근 확인 목적에 한하여 최소한으로
                처리합니다.
              </p>
              <p>
                2. 얼굴인식 정보는 사진·영상이 아닌 특징값(벡터) 형태로 저장되며, 원본 이미지는
                저장하지 않습니다.
              </p>
              <p>
                2. 정보주체는 얼굴인식에 동의하지 않을 권리가 있으며, 이 경우 회사는 QR, 수기 입력
                등 대체 인증 수단을 제공합니다.
              </p>
              <p>
                3. 얼굴인식 정보 처리에 관한 사항은 별도의 민감정보 처리 동의서를 통해 고지·
                동의받습니다.
              </p>
            </div>
          </section>

          <section className={css.section}>
            <div className={css.sectionTop}>
              <h2>제 4조 개인정보의 처리 및 보유 기간</h2>
            </div>
            <hr />

            <div className={css.durationBox}>
              <p>
                <span>1. 건설 계약 및 노무 관련 서류 :</span> 3년
              </p>
              <p>
                <span>2. 회계 및 세무 증빙 :</span> 5년
              </p>
              <p>
                <span>3. 얼굴 식별 정보 :</span> 근로 관계 종료 시 또는 이용자 요청 시 즉시 파기(단,
                분쟁 대비가 필요한 경우 별도 고지 후 보관)
              </p>
              <p>
                <span>4. 접속 로그 등 자동 수집 정보 :</span> 1년
              </p>
            </div>
          </section>

          <section className={css.section}>
            <div className={css.sectionTop}>
              <h2>제 5조 개인정보의 파기 절차 및 방법</h2>
            </div>
            <hr />

            <div className={css.sectionBottom}>
              <p>
                <span>1. 파기절차 : </span> 목적이 달성된 개인정보는 내부 방침 및 관련 법령에 따라
                지체 없이 파기합니다.
              </p>
              <p>
                <span>2. 파기방법 : </span> 전자적 파일은 복원이 불가능한 기술적 방법을 사용하며,
                종이문서는 분쇄하거나 소각합니다.
              </p>
            </div>
          </section>

          <section className={css.section}>
            <div className={css.sectionTop}>
              <h2>제 6조 개인정보의 제3자 제공</h2>
            </div>
            <hr />
            <div className={css.sectionBottom}>
              <p>
                <span>1. 제공 기관 :</span> 국세청, 고용노동부, 근로복지공단, 국민연금공단,
                건설근로자공제회
              </p>
              <p>
                <span>2. 제공 목적:</span> 4대보험 취득·상실 신고, 퇴직공제금 적립, 원천세 신고
              </p>
            </div>
          </section>

          <section className={css.section}>
            <div className={css.sectionTop}>
              <h2>제 7조 개인정보 처리 위탁</h2>
            </div>
            <hr />
            <div className={css.sectionBottom}>
              <p>
                <span>1. 수탁자 :</span> AWS(클라우드 서버), NHN Cloud(얼굴인식 API), 노무법인(자문)
              </p>
              <p>
                <span>2. 위탁 업무:</span> 데이터 보관, 얼굴인식 및 OCR 엔진 운영, 노무 신고 대행
                업무
              </p>
            </div>
          </section>

          <section className={css.section}>
            <div className={css.sectionTop}>
              <h2>제 8조 공동 개인정보처리자에 관한 사항</h2>
            </div>
            <hr />
            <div className={css.sectionBottom}>
              <h3>
                회사는 건설사(현장 운영 주체)와 함 께 근로자 개인정보를 처리할 수 있으며, 이 경우
                회사와 건설사는 공동 개인정 보처리자로서 각자의 책임을 부담합니다.
              </h3>
              <p>
                <span>1. 회사 :</span> 플랫폼 제공 및 시스템 운영
              </p>
              <p>
                <span>2. 건설사 :</span> 근로자 정보 입력 및 현장 관리
              </p>
            </div>
          </section>

          <section className={css.section}>
            <div className={css.sectionTop}>
              <h2>제 9조 정보주체의 권리·의무 및 행사방법</h2>
            </div>
            <hr />
            <div className={css.sectionBottom}>
              <h3>
                이용자는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제, 처리정지 요구 등의 권리를
                행사할 수 있습니다. 얼굴인식 등 생체정보 수집에 동의하지 않을 경우 대체 인증
                수단(QR, 수기 등)을 요청할 권리가 있습니다.
              </h3>
            </div>
          </section>

          <section className={css.section}>
            <div className={css.sectionTop}>
              <h2>제 10조 개인정보의 안전성 확보 조치</h2>
            </div>
            <hr />
            <div className={css.sectionBottom}>
              <h3>회사는 개인정보 보호를 위해 다음과 같은 조치를 취합니다.</h3>
              <p>
                <span>1. 기술적 조치 :</span> 개인정보 및 생체정보 암호화, 접속 기록 보관, 보안
                프로그 램 설치
              </p>
              <p>
                <span>2. 관리적 조치 :</span> 내부관리계획 수립, 개인정보 취급자 최소화 및 정기 교육
              </p>
              <p>
                <span>3. 물리적 조치 :</span> 서버실 등 통제구역 설정 및 물리적 보안 장치 운영
              </p>
            </div>
          </section>

          <section className={css.section}>
            <div className={css.sectionTop}>
              <h2>제 11조 개인정보 보호책임자</h2>
            </div>
            <hr />
            <div className={css.sectionBottom}>
              <h3>
                회사는 개인정보 처리에 관한 업무를 총괄해서책임지고 이용자의 고충을 처리하기 위하여
                아래와 같이 보호책임자를 지정합니다.
              </h3>

              <p>
                <span>1. 성명:</span> 허규성
              </p>
              <p>
                <span>2. 직책:</span> 감사
              </p>
              <p>
                <span>3. 연락처:</span> 010-9575-6488, idb@hongplat.com
              </p>
            </div>
          </section>

          <section className={css.section}>
            <div className={css.sectionTop}>
              <h2>제 12조 개인정보 처리방침 변경</h2>
            </div>
            <hr />
            <div className={css.sectionBottom}>
              <h3>
                이 개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 추가·삭제 및 수정
                내용이 있을 시 변경 사항을 공지사항을 통해 고지합니다.
              </h3>

              <p>
                <span>- 공고 및 시행 일자 :</span> 2026년 3월 00일 (예정)
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
