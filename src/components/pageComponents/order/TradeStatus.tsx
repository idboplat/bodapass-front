"use client";
import styled from "styled-components";
import * as styles from "../styled/contentboxStyled";
import { HomeProps } from "@/types/common";
import { Input_box } from "../styled/inputboxStyled";
import { Write_box } from "../styled/writeboxStyled";
import { Calendar_box } from "../styled/calendarboxStyled";
import { Select_box } from "../styled/selectboxStyled";
import { Button_box } from "../styled/buttonboxStyled";
import { Line_box } from "../styled/lineboxStyled";
import iconSearch from "@/assets/images/icon_search.png";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import callTms from "@/libraries/callTms";
import { TBW_106000_Q03 } from "@/types/api";
import { ActionIcon, Button, TextInput } from "@mantine/core";
import Image from "next/image";
import css from "@/components/common/btn/Btn.module.scss";

const Flex1_li = styled.li`
  flex: 1 !important;
  -webkit-flex: 1;
  min-width: 0;
`;

const Flex_vc = styled.div`
  display: flex;
  flex-wrap: wrap !important;
  align-items: center !important;
  width: 100%;
`;

const BSTP_MAP = {
  "": "전체",
  B: "매수",
  S: "매도",
} as const;

interface ScreenTradeStatusProps {}

/** 유저/마켓관리 - 거래내역 */
export default function TradeStatus({ page, session }: HomeProps<ScreenTradeStatusProps>) {
  const [openMarket, setOpenMarket] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [openId, setOpenId] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openType, setOpenType] = useState(false);
  const [selectedType, setSelectedType] = useState(-1);

  const [count, setCount] = useState(0);
  const [instCd, setInstCd] = useState("");
  const [bstp, setBstp] = useState<keyof typeof BSTP_MAP>("");
  const [strDd, setStrDd] = useState("2024-12-25");
  const [endDd, setEndDd] = useState("2024-12-26");

  const query = useQuery({
    queryKey: ["TBW_106000_Q03", count],
    queryFn: async () => {
      const result = await callTms<TBW_106000_Q03>({
        session,
        svcId: "TBW_106000_Q03",
        data: [
          session.user.corpCd,
          instCd, // 종목코드
          strDd.replaceAll("-", ""), // 조회 시작일
          endDd.replaceAll("-", ""), // 조회 종료일
          bstp, // bstp
          "KRW", // 기준통화코드
        ],
      });

      const data = result.svcRspnData || [];
      return data;
    },
    select: (data) => {
      return data.map((item) => {
        return {
          "체결 일시": item.F01,
          "회사 코드": item.F02,
          "회사 명": item.F03,
          // "계좌 번호": item.F04,
          "사용자 ID": item.F05,
          종목: item.F06,
          레버리지: item.F07,
          "매수/매도": item.F08 === "B" ? "매수" : "매도",
          체결가: item.F09,
          "체결 수량": item.F10,
          진입가: item.F11,
          수수료: item.F12,
          손익: item.F13,
          "가격 소수점": item.F14,
          "수량 소수점": item.F15,
          "체결 일자": item.F16,
          "체결 일련번호": item.F17,
          "주문 일자": item.F18,
          "주문 일련번호": item.F19,
          "기준 환율": item.F20,
        };
      });
    },
    enabled: count > 0,
  });

  const onSearch = () => {
    console.log("onSearch", count);
    setCount((pre) => pre + 1);
  };

  return (
    <styles.Section>
      <styles.TitleBox>
        <h2>{page.title}</h2>
        <p>{page.description}</p>
      </styles.TitleBox>

      <styles.Content_box>
        {/** 검색 설정 */}
        <Write_box>
          <ul>
            <li className="grid-1">
              <Flex_vc>
                {/** 마켓 선택 */}
                {/* <Select_box openType={openMarket} style={{width: "330px", marginRight: "17px"}}>
                  <button type="button" onClick={() => setOpenMarket(!openMarket)}><p id="select-button">전체 마켓</p></button>
                  <div>
                    <dl>
                      <dd className=""><a ><p>select list 1</p></a></dd>
                      <dd className=""><a ><p>select list 2</p></a></dd>
                    </dl>
                  </div>
                </Select_box> */}

                {/** 주문 유형 선택 (전체, 롱, 숏) */}
                {/* <Select_box openType={openOrder} style={{width: "330px", marginRight: "17px"}}>
                  <button type="button" onClick={() => setOpenOrder(!openOrder)}><p id="select-button">전체 주문</p></button>
                  <div>
                    <dl>
                      <dd className=""><a ><p>select list 1</p></a></dd>
                      <dd className=""><a ><p>select list 2</p></a></dd>
                    </dl>
                  </div>
                </Select_box> */}

                {/** 아이디 */}
                {/* <Select_box openType={openId} style={{width: "330px", marginRight: "17px"}}>
                  <button type="button" onClick={() => setOpenId(!openId)}><p id="select-button">아이디</p></button>
                  <div>
                    <dl>
                      <dd className=""><a ><p>select list 1</p></a></dd>
                      <dd className=""><a ><p>select list 2</p></a></dd>
                    </dl>
                  </div>
                </Select_box> */}

                {/** 종목코드 설정 */}
                <TextInput
                  styles={(t, p, c) => {
                    console.log("vars", t, p, c);
                    return {
                      root: { "--input-right-section-width": "53px" },
                    };
                  }}
                  placeholder="종목코드"
                  rightSection={
                    <ActionIcon
                      variant="transparent"
                      classNames={{ root: css.search }}
                      vars={(t, p, c) => {
                        console.log("vars", t, p, c);
                        return {
                          root: { "--ai-bg": `url(${iconSearch.src})` },
                        };
                      }}
                    />
                  }
                />
                {/* <Input_box flex1={true}>
                  <input
                    type="text"
                    placeholder="종목코드"
                    value={instCd}
                    onChange={(e) => setInstCd(e.target.value)}
                  />
                  <a className="search" onClick={onSearch}>
                    검색
                  </a>
                </Input_box> */}
              </Flex_vc>
            </li>
            <Flex1_li>
              <strong>기간</strong>
              <div>
                <Calendar_box openPop={openCalendar}>
                  <div className="cal-button">
                    <a
                      className="select"
                      onClick={() => {
                        setOpenCalendar(!openCalendar);
                      }}
                    >
                      <input value={strDd} onChange={(e) => setStrDd(e.target.value)} />
                      <em>~</em>
                      <input value={endDd} onChange={(e) => setEndDd(e.target.value)} />
                    </a>
                    <a className="yesterday">어제</a>
                    <a className="today">오늘</a>
                  </div>
                </Calendar_box>
              </div>
            </Flex1_li>

            <li className="grid-3">
              <strong>타입</strong>
              <div>
                <Select_box openType={openType}>
                  <button type="button" onClick={() => setOpenType(!openType)}>
                    <p id="select-button">{BSTP_MAP[bstp]}</p>
                  </button>
                  <div>
                    <dl>
                      <dd className={bstp === "" ? "active" : ""}>
                        <a onClick={() => setBstp("")}>
                          <p>전체</p>
                        </a>
                      </dd>
                      <dd className={bstp === "B" ? "active" : ""}>
                        <a onClick={() => setBstp("B")}>
                          <p>매수</p>
                        </a>
                      </dd>
                      <dd className={bstp === "S" ? "active" : ""}>
                        <a onClick={() => setBstp("S")}>
                          <p>매도</p>
                        </a>
                      </dd>
                    </dl>
                  </div>
                </Select_box>
              </div>
            </li>
          </ul>
        </Write_box>

        {/** 검색 버튼 */}
        <Button_box mt="24">
          <div style={{ width: "110px" }}>
            <a className="btn-active" onClick={onSearch}>
              검색
            </a>
          </div>
        </Button_box>

        <Button variant="filled">asdasd</Button>
        <Button variant="outline">asdasd</Button>

        <Line_box></Line_box>

        <styles.Table_box>
          <styles.Table_body>
            <table>
              {/** 테이블 헤더 */}
              <thead>
                <tr>
                  <th>체결 일시</th>
                  <th>회사 코드</th>
                  <th>회사 명</th>
                  <th>사용자 ID</th>
                  <th>종목</th>
                  <th>레버리지</th>
                  <th>매수/매도</th>
                  <th>체결가</th>
                  <th>체결 수량</th>
                  <th>진입가</th>
                  <th>수수료</th>
                  <th>손익</th>
                </tr>
              </thead>

              {/** 테이블 body */}
              <tbody>
                {query.data?.map((item, index) => (
                  <tr key={`trade_status_${index}`}>
                    <td>{item["체결 일시"]}</td>
                    <td>{item["회사 코드"]}</td>
                    <td>{item["회사 명"]}</td>
                    <td>{item["사용자 ID"]}</td>
                    <td>{item["종목"]}</td>
                    <td>{item["레버리지"]}</td>
                    <td>{item["매수/매도"]}</td>
                    <td>{item["체결가"]}</td>
                    <td>{item["체결 수량"]}</td>
                    <td>{item["진입가"]}</td>
                    <td>{item["수수료"]}</td>
                    <td>{item["손익"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </styles.Table_body>
        </styles.Table_box>
      </styles.Content_box>
    </styles.Section>
  );
}

// <div className="cal-popup">

// <div className="popup-head">
//   <h2>
//     <time>2024.09.11</time>
//     <time>2024.10.10</time>
//   </h2>
//   <a className="close" onClick={() => setOpenCalendar(false)}>닫기</a>
// </div>

// <div className="popup-body">
//   <div className="cal-head">
//     <a className="prev">이전</a>
//     <div className="cal-head-start">
//       <strong className="date">2024.11</strong>
//     </div>
//     <div className="cal-head-end">
//       <strong className="date">2024.12</strong>
//     </div>
//     <a className="next">다음</a>
//   </div>

//   <div className="cal-body">
//     <table className="cal-list-start">
//       <thead>
//         <tr>
//           <th>일</th>
//           <th>월</th>
//           <th>화</th>
//           <th>수</th>
//           <th>목</th>
//           <th>금</th>
//           <th>토</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td></td>
//           <td><p className="date">1</p></td>
//           <td><p className="date">2</p></td>
//           <td><p className="date">3</p></td>
//           <td><p className="date">4</p></td>
//           <td><p className="date">5</p></td>
//           <td><p className="date">6</p></td>
//         </tr>
//         <tr>
//           <td className="sun"><p className="date">7</p></td>
//           <td><p className="date">8</p></td>
//           <td><p className="date">9</p></td>
//           <td><p className="date">10</p></td>
//           <td><p className="date">11</p></td>
//           <td><p className="date">12</p></td>
//           <td><p className="date">13</p></td>
//         </tr>
//         <tr>
//           <td className="sun today"><a className="date">14</a></td>
//           <td><a className="date">15</a></td>
//           <td><a className="date">16</a></td>
//           <td><a className="date">17</a></td>
//           <td><a className="date">18</a></td>
//           <td><a className="date">19</a></td>
//           <td><a className="date">20</a></td>
//         </tr>
//         <tr>
//           <td className="sun"><a className="date">21</a></td>
//           <td><a className="date">22</a></td>
//           <td><a className="date">23</a></td>
//           <td><a className="date">24</a></td>
//           <td><a className="date">25</a></td>
//           <td><a className="date">26</a></td>
//           <td><a className="date">27</a></td>
//         </tr>
//         <tr>
//           <td className="sun"><a className="date">28</a></td>
//           <td><a className="date">29</a></td>
//           <td><a className="date">30</a></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//         </tr>
//       </tbody>
//     </table>

//     <table className="cal-list-end">
//       <thead>
//         <tr>
//           <th>일</th>
//           <th>월</th>
//           <th>화</th>
//           <th>수</th>
//           <th>목</th>
//           <th>금</th>
//           <th>토</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td></td>
//           <td><a className="date">1</a></td>
//           <td><a className="date">2</a></td>
//           <td><a className="date">3</a></td>
//           <td><a className="date">4</a></td>
//           <td><a className="date">5</a></td>
//           <td><a className="date">6</a></td>
//         </tr>
//         <tr>
//           <td className="sun"><a className="date">7</a></td>
//           <td><a className="date">8</a></td>
//           <td><a className="date">9</a></td>
//           <td><a className="date">10</a></td>
//           <td><a className="date">11</a></td>
//           <td><a className="date">12</a></td>
//           <td><a className="date">13</a></td>
//         </tr>
//         <tr>
//           <td className="sun"><a className="date">14</a></td>
//           <td><a className="date">15</a></td>
//           <td><a className="date">16</a></td>
//           <td><a className="date">17</a></td>
//           <td><a className="date">18</a></td>
//           <td><a className="date">19</a></td>
//           <td><a className="date">20</a></td>
//         </tr>
//         <tr>
//           <td className="sun"><a className="date">21</a></td>
//           <td><a className="date">22</a></td>
//           <td><a className="date">23</a></td>
//           <td><a className="date">24</a></td>
//           <td><a className="date">25</a></td>
//           <td><a className="date">26</a></td>
//           <td><a className="date">27</a></td>
//         </tr>
//         <tr>
//           <td className="sun"><a className="date">28</a></td>
//           <td><a className="date">29</a></td>
//           <td><a className="date">30</a></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//         </tr>
//       </tbody>
//     </table>
//   </div>
// </div>
// </div>
