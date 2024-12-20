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

const Flex_tc = styled.div`
  display:flex; 
  flex-wrap:wrap !important;
  align-items:center !important;
  justify-content:center !important;
  width:100%;
`;

interface ScreenAgentListProps {}

/** 에이전트 관리 - 목록 */
export default function ScreenAgentList(
  { page, session }: HomeProps<ScreenAgentListProps>
) {

  const [openType, setOpenType] = useState(false);
  const [selectedTypeName, setSelectedTypeName] = useState("에이전트 아이디");
  const [selectedType, setSelectedType] = useState(0);



  return (
    <styles.Section>
      <styles.TitleBox>
        <h2>{page.title}</h2>
        <p>{page.description}</p>
      </styles.TitleBox>

      <styles.Content_box>
        <Write_box>
          <ul>
            <li className="grid-1">
              <Flex_tc>
                <Select_box openType={openType} style={{width: "330px", marginRight: "17px"}}>
                  <button type="button" onClick={() => setOpenType(!openType)}><p id="select-button">{selectedTypeName}</p></button>
                  <div>
                    <dl>
                      <dd className={(selectedType === 0)? "active" : ""}><a onClick={() => {setSelectedType(0); setSelectedTypeName("에이전트 아이디");}}><p>에이전트 아이디</p></a></dd>
                      <dd className={(selectedType === 1)? "active" : ""}><a onClick={() => {setSelectedType(1); setSelectedTypeName("에이전트 닉네임");}}><p>에이전트 닉네임</p></a></dd>
                    </dl>
                  </div>
                </Select_box>
                <Input_box style={{width: "500px"}}>
                  <input type="text" placeholder="검색어" />
                  <a className="search">검색</a>
                </Input_box>
              </Flex_tc>
            </li>

          </ul>

        </Write_box>

        <Line_box></Line_box>

        <styles.Table_box>
          <styles.Table_body>
            <table>
              <thead>
                <tr>
                  <th>단계</th>
                  <th>번호</th>
                  <th>등급</th>
                  <th>타입</th>
                  <th>소속 에이전트</th>
                  <th>에이전트</th>
                  <th>현재 보유 금액</th>
                  <th>수수료</th>
                  <th>가입시각</th>
                  <th>관리</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>2</td>
                  <td>8842</td>
                  <td>---</td>
                  <td>---</td>
                  <td>
                    <Button_box sm={true}>
                      <a className="btn-bd-black" style={{marginRight: "5px"}}>상부</a>
                      <a className="btn-bd-black">{"하부(2)"}</a>
                    </Button_box>
                  </td>
                  <td>agent01</td>
                  <td>0,000,000 KRW</td>
                  <td>7.5%</td>
                  <td>24-10-13 03:33:25</td>
                  <td>
                    <Button_box sm={true}>
                      <a className="btn-bd-black">관리</a>
                    </Button_box>
                  </td>
                </tr>
              </tbody>
            </table>
          </styles.Table_body>

        </styles.Table_box>

        
        <Button_box mt="45">
          <div style={{width: "130px"}}>
            <a className="btn-active">{"+ 에이전트 생성"}</a>
          </div>
        </Button_box>

      </styles.Content_box>
    </styles.Section>
  );

} 