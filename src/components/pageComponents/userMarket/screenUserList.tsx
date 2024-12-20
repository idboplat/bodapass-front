"use client"
import * as styles from "../styled/contentboxStyled"
import { HomeProps } from "@/types/common"
import { Input_box } from "../styled/inputboxStyled"
import { Write_box } from "../styled/writeboxStyled"
import { Button_box } from "../styled/buttonboxStyled"
import { Line_box } from "../styled/lineboxStyled"

import { useState } from "react"

interface ScreenUserListProps {}

/** 유저/마켓관리 - 유저 목록 */
export default function ScreenUserList(
  { page, session }: HomeProps<ScreenUserListProps>
) {



  return (
    <styles.Section>
      <styles.TitleBox>
        <h2>{page.title}</h2>
        <p>{"유저 목록 금월 내역은 XX-XX 00:00:00 ~ YY-YY 23:59:59 총 합을 표시합니다."}</p>
      </styles.TitleBox>

      <styles.Content_box>
        <Write_box>
          {/** 검색 조건 */}
          <ul>
            {/** 소속 에이전트 ID */}
            <li className="grid-3">
              <strong>소속 에이전트 ID</strong>
              <div>
                <Input_box>
                  <input type="text" placeholder="" />
                </Input_box>
              </div>
            </li>

            {/** 유저 ID */}
            <li className="grid-3">
              <strong>유저 ID</strong>
              <div>
                <Input_box>
                  <input type="text" placeholder="" />
                </Input_box>
              </div>
            </li>

            {/** 유저 닉네임 */}
            <li className="grid-3">
              <strong>유저 닉네임</strong>
              <div>
                <Input_box>
                  <input type="text" placeholder="" />
                </Input_box>
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
              {/** 테이블 헤더 */}
              <thead>
                <tr>
                  <th>번호</th>
                  <th><a >소속 에이전트</a></th>
                  <th><a >유저</a></th>
                  <th><a >금월 투자원금</a></th>
                  <th><a >금월 순이익</a></th>
                  <th><a >금월 손익금</a></th>
                  <th><a >현재 보유금</a></th>
                  <th><a >현재 마일리지</a></th>
                  <th><a >가입 시각</a></th>
                  <th><a >최근 접속 시각</a></th>
                  <th>관리</th>
                </tr>
              </thead>

              {/**  */}
              <tbody>
                <tr>
                  <td>9876543</td>
                  <td>OO agent</td>
                  <td>user123</td>
                  <td>000,000KRW</td>
                  <td>000,000KRW</td>
                  <td>000,000KRW</td>
                  <td>000,000KRW</td>
                  <td>0</td>
                  <td>24-12-12 00:00:00</td>
                  <td>24-12-12 100:00:00</td>
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