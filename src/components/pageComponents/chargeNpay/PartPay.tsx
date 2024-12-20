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
import { Tab_box } from "../styled/tabboxStyled"
import { Session } from "next-auth"
import { useState } from "react"


const Flex1_li = styled.li`
  flex:1 !important; 
  -webkit-flex:1; 
  min-width:0;
`;


interface PartPayProps {
  session : Session;

}

/** 출금 */
export default function PartPay(
  { session }: PartPayProps) {

    const [openCalendar, setOpenCalendar] = useState(false);


    return (
      <>
      <Write_box>
        <ul>
          <li className="grid-4">
						<strong>소속 에이전트 ID</strong>
						<div>
              <Input_box>
                <input style={{textAlign: "center"}} type="text" value="agent id"></input>
              </Input_box>
						</div>
					</li>
          <li className="grid-4">
						<strong>유저 ID</strong>
						<div>
              <Input_box>
                <input style={{textAlign: "center"}} type="text" value="user ID"></input>
              </Input_box>
						</div>
					</li>
          <li className="grid-4">
						<strong>소속 에이전트 ID</strong>
						<div>
              <Input_box>
                <input style={{textAlign: "center"}} type="text" value="agent 1"></input>
              </Input_box>
						</div>
					</li>
          <li className="grid-4">
						<strong>유저 ID</strong>
						<div>
              <Input_box>
                <input style={{textAlign: "center"}} type="text" value="user 1"></input>
              </Input_box>
						</div>
					</li>
          <Flex1_li>
            <strong>기간</strong>
            <div>
              <Calendar_box openPop={openCalendar}>
                <div className="cal-button">
                  <a className="select" onClick={() => {setOpenCalendar(!openCalendar)}}>
                    <time>2024-10-06 19:00:00</time>
                    <em>~</em>
                    <time>2024-10-06 19:00:00</time>
                  </a>
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
                      <a className="prev">이전</a>
                      <div className="cal-head-start">
                        <strong className="date">2024.11</strong>
                      </div>
                      <div className="cal-head-end">
                        <strong className="date">2024.12</strong>
                      </div>
                      <a className="next">다음</a>
                    </div>

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

        </ul>
      </Write_box>

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
								<th>A</th>
								<th>B</th>
								<th>입금자명</th>
								<th>출금 요청 KRW</th>
								<th>출금 요청 금액</th>
								<th>출금 전 금액</th>
								<th>출금 후 잔액요청 시각</th>
								<th>처리시각</th>
								<th>상태</th>
								<th>관리</th>
							</tr>
            </thead>

            <tbody>
              <tr>
								<td>0</td>
								<td>0</td>
								<td>0</td>
								<td>0</td>
								<td>0</td>
								<td>0</td>
								<td>0</td>
								<td>0</td>
								<td>0</td>
								<td>0</td>
								<td>0</td>
							</tr>
							<tr>
								<td>-</td>
								<td>-</td>
								<td>-</td>
								<td>-</td>
								<td>-</td>
								<td>-</td>
								<td>-</td>
								<td>-</td>
								<td>-</td>
								<td>-</td>
								<td>-</td>
							</tr>
            </tbody>
          </table>
        </styles.Table_body>

      </styles.Table_box>
      </>
    );
  }