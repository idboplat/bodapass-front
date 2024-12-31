"use client";
import { TClientPage } from "@/utils/getPage";
import { Session } from "next-auth";
import css from "./Home.module.scss";
import { TextInput } from "@mantine/core";

interface ClientProps {
  page: TClientPage;
  session: Session;
}

export default function Client({ page, session }: ClientProps) {
  return (
    <section className="main">
      <div className={css.contentBox}>
        <h2>{page.title}</h2>
        <p>{page.description}</p>
      </div>

      <div className={css.contentBox}>
        <div className={css.writeBox}>
          <ul>
            {/** 아이디 (관리자) */}
            <li>
              <strong>아이디</strong>
              <div>
                <TextInput />
              </div>
            </li>

            {/** 닉네임 (관리자) */}
            <li>
              <strong>닉네임</strong>
              <div>
                <TextInput />
              </div>
            </li>

            {/** 소속 에이전트 */}
            <li>
              <strong>소속 에이전트</strong>
              <div>
                <TextInput />
              </div>
            </li>

            {/** 그룹 분류 */}
            <li>
              <strong>분류</strong>
              <div>
                <TextInput />
              </div>
            </li>
            <br />
            <br />
            <br />
            <br />

            {/** 에이전트 보유금액 */}
            <li className="grid-3">
              <strong>현재 보유금액</strong>
              <div>
                <TextInput rightSection={<em>KRW</em>} />
              </div>
            </li>

            {/** 하부 에이전트 보유금액 */}
            <li className="grid-3">
              <strong>
                하부 에이전트
                <br />
                현재 총 보유금액
              </strong>
              <div>
                <TextInput rightSection={<em>KRW</em>} />
              </div>
            </li>

            {/** 하부 유저 보유금액 */}
            <li className="grid-3">
              <strong>
                하부 유저
                <br />
                현재 총 보유금액
              </strong>
              <div>
                <TextInput rightSection={<em>KRW</em>} />
              </div>
            </li>

            {/** 수수료 */}
            <li className="grid-3">
              <strong>수수료</strong>
              <div>
                <TextInput rightSection={<em>KRW</em>} />
              </div>
            </li>

            {/** 입고 금액 */}
            <li className="grid-3">
              <strong>총 입고 금액</strong>
              <div>
                <TextInput rightSection={<em>KRW</em>} />
              </div>
            </li>

            {/** 출고 금액 */}
            <li className="grid-3">
              <strong>총 출고 금액</strong>
              <div>
                <TextInput rightSection={<em>KRW</em>} />
              </div>
            </li>

            {/** 하부 에이전트 수 */}
            <li className="grid-3">
              <strong>하부 에이전트 수</strong>
              <div>
                <TextInput placeholder="전체 0명/ 영업 0명" rightSection={<em>KRW</em>} />
              </div>
            </li>

            {/** 하부 유저 수 */}
            <li className="grid-3">
              <strong>하부 유저 수</strong>
              <div>
                <TextInput rightSection={<em>명</em>} />
              </div>
            </li>

            {/** 가입 날짜 */}
            <li className="grid-3">
              <strong>가입 날짜</strong>
              <div>
                <TextInput />
              </div>
            </li>
          </ul>

          <ul>
            {/** 비밀번호 변경 */}
            <li>
              <strong>비밀번호</strong>
              <div>
                <TextInput />
              </div>
            </li>

            {/** API KEY 관련란은 없어질 듯. */}
            {/* <li className="flex-vt">
              <strong>API KEY</strong>
              <div>
                <Input_box>
                  <input type="text" value="yRVUMZBIBEIePnIxyvYFfdMvqCFhXDi1"></input>
                  <a>재발급</a>
                </Input_box>
                <Message_box>
                  <p>API KEY는 개발에 필요한 정보입니다. 개발자에게 전달해주세요.</p>
                </Message_box>
              </div>
            </li> */}

            {/** 알림 설정 */}
            {/* <li className="flex-vt">
              <strong style={{ paddingTop: "0px" }}>
                현재 보유
                <br />
                금액 알림
              </strong>
              <div>
                <Input_box>
                  <input type="text" value="0,000,000 KRW"></input>
                  <a>변경</a>
                </Input_box>
                <Message_box>
                  <p>현재 보유 금액이 설정한 금액 이하로 떨어지면 알림을 받을 수 있습니다.</p>
                </Message_box>
              </div>
            </li> */}

            {/** API- IP 설정 */}
            <li className="flex-vt">
              <strong style={{ paddingTop: "0px" }}>
                API 호출 허용
                <br />
                IP 설정
              </strong>
              <div>
                <TextInput rightSection={<>변경</>} />
                <div className={css.messageBox}>
                  <p>
                    API 호출 허용 IP 는 API를 호출하는&quot;서버&quot;의 IP를 등록해야합니다.
                    <br />
                    잘 모르시겠으면, 담당 개발팀에게 확인 요청해 주시기 바랍니다.
                    <br />
                    API 호출 허용 IP를 등록하지 않고 API를 이용하실 수 없습니다.
                    <br />
                    등록 후 수정은 불가능하며 초기화를 원하실 경우 데스크를 통해 변경 요청
                    해주셔야합니다.
                    <br />
                    다중 ip는 콤마(,)로 구분하며 띄여쓰기는 허용되지 않습니다. <br />
                    운영 중엔 API 호출 허용 IP 등록을 해주시는것을 권장드립니다.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
