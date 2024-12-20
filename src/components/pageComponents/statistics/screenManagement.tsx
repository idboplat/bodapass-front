"use client"
import styled, { css } from "styled-components"
import * as styles from "../styled/contentboxStyled"
import * as colors from "../styled/colorboxStyled"
import { HomeProps } from "@/types/common"
import { Input_box } from "../styled/inputboxStyled"
import { Write_box } from "../styled/writeboxStyled"
import { Calendar_box } from "../styled/calendarboxStyled"
import { Select_box } from "../styled/selectboxStyled"
import { Button_box } from "../styled/buttonboxStyled"
import { Line_box } from "../styled/lineboxStyled"

import { useState } from "react"


const Flex_vc = styled.div`
  display:flex; 
  flex-wrap:wrap !important;
  align-items:center !important;
  width:100%;
`;


interface ScreenManagementProps {}

/** 통계 - 정산관리 */
export default function ScreenManagement(
  { page, session }: HomeProps<ScreenManagementProps>
) {

  const [openMarket, setOpenMarket] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);



  return (
    <styles.Section>
      <styles.TitleBox>
        <h2>{page.title}</h2>
        <p>{page.description}</p>
      </styles.TitleBox>

      <styles.Content_box>
        <Flex_vc>

          <Select_box openType={openMarket} style={{width: "200px"}}>
            <button type="button" onClick={() => setOpenMarket(!openMarket)}><p>전체 마켓</p></button>
            <div>
						<dl>
							<dd><a href=""><p>마켓 1</p></a></dd>
							<dd><a href=""><p>마켓 2</p></a></dd>
						</dl>
					</div>
          </Select_box>

          <colors.Ft_gray style={{marginLeft: "40px", marginRight: "30px", fontSize: "16px"}}>기간</colors.Ft_gray>
          <Calendar_box openPop={openCalendar} style={{flex: 1, marginRight: "20px"}}>
            <div className="cal-button">
              <a className="select" onClick={() => {setOpenCalendar(!openCalendar)}}>
                <time>2024-10-06 19:00:00</time>
                <em>~</em>
                <time>2024-10-06 19:00:00</time>
              </a>
              <a className="yesterday">어제</a>
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

          <Input_box style={{width: "350px"}} >
            <input type="text" placeholder="검색어" />
            <a className="search">검색</a>
          </Input_box>

        </Flex_vc>

        <styles.State_box style={{marginTop: "30px"}}>
          <ul>

            <li>
              <a className="inner">
                <div>
                  <p>정산기간</p>
                  <strong>0,000,000 KRW</strong>
                </div>
              </a>
            </li>

            <li>
              <a className="inner">
                <div>
                  <p>보유잔액 합계</p>
                  <strong>0,000,000 KRW</strong>
                </div>
              </a>
            </li>
          </ul>
        </styles.State_box>

        <styles.State_box style={{marginTop: "30px"}}>
          <ul>

            <li>
              <a className="inner">
                <div>
                  <p>현재 보유 금액</p>
                  <strong>0,000,000 KRW</strong>
                </div>
              </a>
            </li>

            <li>
              <a className="inner">
                <div>
                  <p>포지션 증거금</p>
                  <strong>0,000,000 KRW</strong>
                </div>
              </a>
            </li>

            <li>
              <a className="inner">
                <div>
                  <p>오더북 증거금</p>
                  <strong>0,000,000 KRW</strong>
                </div>
              </a>
            </li>

            <li>
              <a className="inner">
                <div>
                  <p>금일 수익</p>
                  <strong>0,000,000 KRW</strong>
                </div>
              </a>
            </li>
          </ul>
        </styles.State_box>

        <styles.Table_box mt="25px">
          <styles.Table_head>
            <h2>마켓별 현황</h2>
            <a >{"+모두보기"}</a>
          </styles.Table_head>

          <styles.Table_body>
            <table>
              <thead>
                <tr>
                  <th>마켓</th>
                  <th>포지션 거래금액</th>
                  <th>포지션 증거금</th>
                  <th>롱포지션 증거금</th>
                  <th>숏포지션 증거금</th>
                  <th>금일 실현수익</th>
                  <th>오더북 롱진입 증거금</th>
                  <th>오더북 숏진입 증거금</th>
                  <th>오더북 청산 증거금</th>
                  <th>오더북 롱청산 증거금</th>
                  <th>오더북 숏청산 증거북</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>BTCUSDT</td>
                  <td>0,000,000.9</td>
                  <td style={{fontWeight: 500}}>000,000.97357</td>
                  <td>000,000.97357</td>
                  <td>000,000.97357</td>
                  <colors.Ft_red>-000,000.97357</colors.Ft_red>
                  <td style={{textAlign: "right"}}>000,000.97357</td>
                  <td style={{textAlign: "right"}}>000,000.97357</td>
                  <td style={{textAlign: "right"}}>000,000.97357</td>
                  <td style={{textAlign: "right"}}>000,000.97357</td>
                  <td style={{textAlign: "right"}}>0</td>
                </tr>
                <tr>
                  <td>BTCUSDT</td>
                  <td>000,000.97357</td>
                  <td style={{fontWeight: 500}}>000,000.97357</td>
                  <td>000,000.97357</td>
                  <td>000,000.97357</td>
                  <colors.Ft_blue>000,000.97357</colors.Ft_blue>
                  <td style={{textAlign: "right"}}>000,000.97357</td>
                  <td style={{textAlign: "right"}}>000,000.97357</td>
                  <td style={{textAlign: "right"}}>000,000.97357</td>
                  <td style={{textAlign: "right"}}>000,000.97357</td>
                  <td style={{textAlign: "right"}}>0</td>
                </tr>
              </tbody>
            </table>
          </styles.Table_body>
        </styles.Table_box>
        


      </styles.Content_box>
    </styles.Section>

  );
}