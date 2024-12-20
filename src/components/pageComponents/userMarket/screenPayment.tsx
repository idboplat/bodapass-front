"use client"
import styled, { css } from "styled-components"
import * as styles from "../styled/contentboxStyled"
import { HomeProps } from "@/types/common"
import { Input_box } from "../styled/inputboxStyled"
import { Write_box } from "../styled/writeboxStyled"
import { Calendar_box } from "../styled/calendarboxStyled"
import { Select_box } from "../styled/selectboxStyled"
import { Button_box } from "../styled/buttonboxStyled"
import { Line_box } from "../styled/lineboxStyled"
import { useState } from "react"

const Flex1_li = styled.li`
  flex:1 !important; 
  -webkit-flex:1; 
  min-width:0;
`;


interface ScreenPaymentProps {}

/** 유저/마켓관리 - 출금 내역 */
export default function ScreenPayment(
  { page, session }: HomeProps<ScreenPaymentProps>
) {

  const [openType, setOpenType] = useState(false);
  const [selectedType, setSelectedType] = useState(-1);
  const [openCalendar, setOpenCalendar] = useState(false);




  return (
    <styles.Section>
      <styles.TitleBox>
        <h2>{page.title}</h2>
        <p>{page.description}</p>
      </styles.TitleBox>

      <styles.Content_box>
        {/** 검색 조건 */}
        <Write_box>
          <ul>
            <li className="grid-3">
              <strong>소속 에이전트 ID</strong>
              <div>
                <Input_box>
                  <input type="text" placeholder="" />
                </Input_box>
              </div>
            </li>
            <li className="grid-3">
              <strong>유저 ID</strong>
              <div>
                <Input_box>
                  <input type="text" placeholder="" />
                </Input_box>
              </div>
            </li>
            <li className="grid-3">
              <strong>번호</strong>
              <div>
                <Input_box>
                  <input type="text" placeholder="" />
                </Input_box>
              </div>
            </li>

            <Flex1_li>
              <strong>기간</strong>
              <div>
                {/** 달력 */}
                <Calendar_box openPop={openCalendar}>
                  <div className="cal-button">
                    <a className="select" onClick={() => {setOpenCalendar(!openCalendar)}}>
                      <time>2024-10-06 19:00:00</time>
                      <em>~</em>
                      <time>2024-10-06 19:00:00</time>
                    </a>

                    {/** 어제 00:00 ~ 23:00 조회 */}
                    <a className="yesterday">어제</a>
                    {/** 오늘 00:00 ~ 23:00 조회 */}
									  <a className="today">오늘</a>
                  </div>

                  <div className="cal-popup">

                    <div className="popup-head">
                      <h2>
                        <time>2024.09.11</time>
                        <time>2024.10.10</time>
                      </h2>
                      <a className="close" onClick={() => setOpenCalendar(false)}>닫기</a>
                    </div>

                    <div className="popup-body">
                      <div className="cal-head">
                        {/** 이전 월 */}
                        <a className="prev">이전</a>
                        <div className="cal-head-start">
                          <strong className="date">2024.11</strong>
                        </div>
                        {/** 다음 월 */}
                        <div className="cal-head-end">
                          <strong className="date">2024.12</strong>
                        </div>
                        <a className="next">다음</a>
                      </div>

                      {/** 달력 컴포넌트는 고민해보자. 적당한 것 있으면 그걸로 하고... */}
                      <div className="cal-body">
                        <table className="cal-list-start">
                          <thead>
                            <tr>
                              <th>일</th>
                              <th>월</th>
                              <th>화</th>
                              <th>수</th>
                              <th>목</th>
                              <th>금</th>
                              <th>토</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td></td>
                              <td><p className="date">1</p></td>
                              <td><p className="date">2</p></td>
                              <td><p className="date">3</p></td>
                              <td><p className="date">4</p></td>
                              <td><p className="date">5</p></td>
                              <td><p className="date">6</p></td>
                            </tr>				
                            <tr>
                              <td className="sun"><p className="date">7</p></td>
                              <td><p className="date">8</p></td>
                              <td><p className="date">9</p></td>
                              <td><p className="date">10</p></td>
                              <td><p className="date">11</p></td>
                              <td><p className="date">12</p></td>
                              <td><p className="date">13</p></td>
                            </tr>				
                            <tr>
                              <td className="sun today"><a className="date">14</a></td>
                              <td><a className="date">15</a></td>
                              <td><a className="date">16</a></td>
                              <td><a className="date">17</a></td>
                              <td><a className="date">18</a></td>
                              <td><a className="date">19</a></td>
                              <td><a className="date">20</a></td>
                            </tr>
                            <tr>
                              <td className="sun"><a className="date">21</a></td>
                              <td><a className="date">22</a></td>
                              <td><a className="date">23</a></td>
                              <td><a className="date">24</a></td>
                              <td><a className="date">25</a></td>
                              <td><a className="date">26</a></td>
                              <td><a className="date">27</a></td>
                            </tr>
                            <tr>
                              <td className="sun"><a className="date">28</a></td>
                              <td><a className="date">29</a></td>
                              <td><a className="date">30</a></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
												  </tbody>
                        </table>

                        <table className="cal-list-end">
                          <thead>
                            <tr>
                              <th>일</th>
                              <th>월</th>
                              <th>화</th>
                              <th>수</th>
                              <th>목</th>
                              <th>금</th>
                              <th>토</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td></td>
                              <td><a className="date">1</a></td>
                              <td><a className="date">2</a></td>
                              <td><a className="date">3</a></td>
                              <td><a className="date">4</a></td>
                              <td><a className="date">5</a></td>
                              <td><a className="date">6</a></td>
                            </tr>				
                            <tr>
                              <td className="sun"><a className="date">7</a></td>
                              <td><a className="date">8</a></td>
                              <td><a className="date">9</a></td>
                              <td><a className="date">10</a></td>
                              <td><a className="date">11</a></td>
                              <td><a className="date">12</a></td>
                              <td><a className="date">13</a></td>
                            </tr>				
                            <tr>
                              <td className="sun"><a className="date">14</a></td>
                              <td><a className="date">15</a></td>
                              <td><a className="date">16</a></td>
                              <td><a className="date">17</a></td>
                              <td><a className="date">18</a></td>
                              <td><a className="date">19</a></td>
                              <td><a className="date">20</a></td>
                            </tr>
                            <tr>
                              <td className="sun"><a className="date">21</a></td>
                              <td><a className="date">22</a></td>
                              <td><a className="date">23</a></td>
                              <td><a className="date">24</a></td>
                              <td><a className="date">25</a></td>
                              <td><a className="date">26</a></td>
                              <td><a className="date">27</a></td>
                            </tr>
                            <tr>
                              <td className="sun"><a className="date">28</a></td>
                              <td><a className="date">29</a></td>
                              <td><a className="date">30</a></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </Calendar_box>
              </div>
            </Flex1_li>

            {/** 타입 선택 */}
            <li className="grid-3">
              <strong>타입</strong>
              <div>
                <Select_box openType={openType}>
                  <button type="button" onClick={() => setOpenType(!openType)}><p id="select-button">출금 타입(?)</p></button>
                  <div>
                    <dl>
                      <dd className={(selectedType === 0)? "active" : ""}><a onClick={() => setSelectedType(0)}><p>타입 1</p></a></dd>
                      <dd className={(selectedType === 1)? "active" : ""}><a onClick={() => setSelectedType(1)}><p>타입 2</p></a></dd>
                    </dl>
                  </div>
                  </Select_box>
              </div>
            </li>
          </ul>

        </Write_box>

        {/** 검색 BUTTON */}
        <Button_box mt="24">
          <div style={{width: "110px"}}>
            <a className="btn-active">검색</a>
          </div>
        </Button_box>

        <Line_box></Line_box>

        <styles.Table_box>
          <styles.Table_body>
            <table>
              <thead>
                <tr>
                  <th>번호</th>
                  <th><a >주는 에이전트명</a></th>
                  <th><a >받는 유저명</a></th>
                  <th><a >타입</a></th>
                  <th><a >출금 금액</a></th>
                  <th><a >출금 전 잔액</a></th>
                  <th><a >출금 후 잔액</a></th>
                  <th><a >처리시각</a></th>
                  <th><a >상태</a></th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>454241</td>
                  <td>또또리</td>
                  <td>김유명</td>
                  <td>C</td>
                  <td>000,000</td>
                  <td>000,000</td>
                  <td>000,000</td>
                  <td>2024-01-01 21:05:52</td>
                  <td>완료</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </styles.Table_body>
        </styles.Table_box>



      </styles.Content_box>
    </styles.Section>
  );
}