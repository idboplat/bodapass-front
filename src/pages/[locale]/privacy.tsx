import css from "./privacy.module.scss";

export default function Privacy() {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>개인정보 처리방침</h1>
        <p className={css.subtitle}>얼굴인식을 통한 출퇴근 관리 서비스</p>
      </div>

      <div className={css.content}>
        <section className={css.intro}>
          <p>
            <strong>[(가칭)일당백/주식회사 홍]</strong>(이하 &quot;회사&quot;)은 「개인정보 보호법」
            등 관련 법령을 준수하며, 이용자의 개인정보를 안전하게 보호하기 위하여 다음과 같이
            개인정보 처리방침을 수립 공개합니다. 본 방침은 얼굴인식 기반 출퇴근 관리 서비스와
            관련하여 적용됩니다.
          </p>
        </section>

        <section className={css.section}>
          <h2 className={css.sectionTitle}>1. 개인정보의 처리 목적</h2>
          <p>
            회사는 근로자의 출퇴근 기록 관리, 근무시간 산정, 임금 및 4대 보험 신고 등 근로관계
            관리와 관련된 행정업무 지원을 목적으로 개인정보를 처리합니다. 또한 출입통제 및 보안,
            서비스 품질 개선, 이용자 문의 대응을 위해서도 개인정보를 처리합니다.
          </p>
        </section>

        <section className={css.section}>
          <h2 className={css.sectionTitle}>2. 처리하는 개인정보의 항목</h2>
          <div className={css.infoList}>
            <div className={css.infoItem}>
              <h3>필수 항목</h3>
              <p>
                성명, 주소, 주민등록번호, 근로자 식별번호, 얼굴 인식 정보(생체정보),
                출입기록(출근/퇴근 시각), 디바이스 정보(카메라 사용 기록)
              </p>
            </div>
            <div className={css.infoItem}>
              <h3>선택 항목</h3>
              <p>휴대전화번호, 이메일 주소(근로자 본인 확인 및 고충 처리용)</p>
            </div>
            <div className={css.infoItem}>
              <h3>자동 수집 항목</h3>
              <p>서비스 이용 로그, 접속기기 정보(IP, OS, 브라우저 정보 등)</p>
            </div>
          </div>
        </section>

        <section className={css.section}>
          <h2 className={css.sectionTitle}>3. 개인정보의 처리 및 보유 기간</h2>
          <p>
            얼굴 인식 정보 및 출퇴근 기록은 관계 법령(예: 「근로기준법」, 「국세기본법」,
            「전자상거래 등에서의 소비자 보호에 관한 법률」)에 따른 보존 의무가 있는 경우 해당 기간
            동안 보관합니다. 보존 기간이 경과하거나 목적이 달성된 경우 지체 없이 파기합니다.
          </p>
        </section>

        <section className={css.section}>
          <h2 className={css.sectionTitle}>4. 개인정보의 파기 절차 및 방법</h2>
          <div className={css.infoList}>
            <div className={css.infoItem}>
              <h3>파기 절차</h3>
              <p>보존 기간 경과 시 내부 규정에 따라 개인정보를 분리 보관 후 안전하게 파기합니다.</p>
            </div>
            <div className={css.infoItem}>
              <h3>파기 방법</h3>
              <p>
                전자적 파일은 복구 불가능한 방법으로 영구 삭제하고, 종이 문서는 분쇄 또는 소각을
                통해 파기합니다.
              </p>
            </div>
          </div>
        </section>

        <section className={css.section}>
          <h2 className={css.sectionTitle}>5. 정보주체와 법정대리인의 권리·의무 및 행사방법</h2>
          <p>
            이용자와 법정대리인은 언제든지 자신의 개인정보 열람/정정/삭제/처리정지 요구를 할 수
            있습니다. 요구는 앱 내 설정 메뉴 또는 개인정보 보호책임자에게 연락함으로써 가능하며,
            회사는 법령에 따라 지체 없이 조치합니다.
          </p>
        </section>

        <section className={css.section}>
          <h2 className={css.sectionTitle}>6. 개인정보 보호책임자 및 고충 처리 부서</h2>
          <div className={css.contactInfo}>
            <div className={css.contactItem}>
              <strong>개인정보 보호책임자:</strong> 허규성
            </div>
            <div className={css.contactItem}>
              <strong>담당 부서:</strong> 감사
            </div>
            <div className={css.contactItem}>
              <strong>연락처:</strong> 010-9575-6488, idb@hongplat.com
            </div>
          </div>
          <p>
            이용자는 서비스 이용 중 발생한 모든 개인정보보호 관련 문의를 위 부서로 신고할 수
            있습니다.
          </p>
        </section>

        <section className={css.section}>
          <h2 className={css.sectionTitle}>7. 개인정보의 안정성 확보 조치</h2>
          <p>회사는 개인정보의 안전한 처리를 위하여 다음과 같은 조치를 시행합니다.</p>
          <ul className={css.securityList}>
            <li>개인정보 암호화 저장 및 전송</li>
            <li>접근 권한 최소화 및 접근기록 관리</li>
            <li>정기적 보안 점검 및 시스템 취약점 개선</li>
            <li>물리적 보안 조치(서버실 출입통제 등)</li>
          </ul>
        </section>

        <section className={css.section}>
          <h2 className={css.sectionTitle}>8. 개인정보 처리방침의 변경</h2>
          <p>
            본 방침은 법령 개정, 서비스 내용 변경 등에 따라 개정될 수 있으며, 변경 사항은 앱 내
            공지사항 및 홈페이지를 통해 안내합니다. 중요한 변경 시에는 사전 고지를 원칙으로 합니다.
          </p>
        </section>

        <section className={css.section}>
          <h2 className={css.sectionTitle}>9. 개인정보 열람/정정/삭제/처리정지 요구권</h2>
          <p>
            이용자와 법정대리인은 개인정보 열람, 정정, 삭제 및 처리정지를 요구할 권리가 있으며,
            회사는 법령에 따라 정당한 사유가 없는 한 이를 거부하지 않습니다.
          </p>
        </section>

        <section className={css.section}>
          <h2 className={css.sectionTitle}>10. 개인정보 열람청구 접수/처리 부서</h2>
          <div className={css.contactInfo}>
            <div className={css.contactItem}>
              <strong>담당 부서:</strong> 기획부
            </div>
            <div className={css.contactItem}>
              <strong>연락처:</strong> 010-5784-1122, idb@hongplat.com
            </div>
          </div>
          <p>회사는 정보주체의 열람청구를 신속하게 처리합니다.</p>
        </section>

        <section className={css.section}>
          <h2 className={css.sectionTitle}>11. 정보주체의 권익침해 구제 방법</h2>
          <p>이용자는 아래 기관에 개인정보 침해와 관련한 상담 및 구제를 신청할 수 있습니다.</p>
          <div className={css.agencyList}>
            <div className={css.agencyItem}>
              <strong>개인정보침해신고센터</strong>
              <p>국번없이 118, privacy.kisa.or.kr</p>
            </div>
            <div className={css.agencyItem}>
              <strong>대검찰청 사이버수사과</strong>
              <p>국번없이 1301, www.spo.go.kr</p>
            </div>
            <div className={css.agencyItem}>
              <strong>경찰청 사이버수사국</strong>
              <p>국번없이 182, cyberbureau.police.go.kr</p>
            </div>
          </div>
        </section>

        <section className={css.section}>
          <h2 className={css.sectionTitle}>12. 개인정보 자동 수집 장치의 설치/운영 및 거부</h2>
          <p>
            회사는 출퇴근 관리 기능 제공을 위해 일부 접속정보파일(Cookie) 또는 로그 기록을 자동으로
            수집할 수 있습니다. 이용자는 단말기의 설정 기능을 통해 이를 거부할 수 있으며, 다만 거부
            시 일부 기능 이용에 제한이 있을 수 있습니다.
          </p>
        </section>

        <section className={css.footer}>
          <h2 className={css.sectionTitle}>부칙</h2>
          <p>본 개인정보 처리방침은 2025년 9월 15일부터 적용됩니다.</p>
        </section>
      </div>
    </div>
  );
}
