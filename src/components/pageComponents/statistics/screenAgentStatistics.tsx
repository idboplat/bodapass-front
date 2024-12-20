"use client"
import * as styles from "../styled/contentboxStyled"
import { HomeProps } from "@/types/common"
import { Input_box } from "../styled/inputboxStyled"
import { Write_box } from "../styled/writeboxStyled"
import { Calendar_box } from "../styled/calendarboxStyled"
import { Select_box } from "../styled/selectboxStyled"
import { Button_box } from "../styled/buttonboxStyled"
import { Line_box } from "../styled/lineboxStyled"
import { Text_box } from "../styled/textboxStyled"
import { Date_box } from "../styled/dateboxStyled"

import { useState } from "react"


interface ScreenAgentStatisticsProps {}

/** 통계 - 에이전트 수익 통계 */
export default function ScreenAgentStatistics(
  { page, session }: HomeProps<ScreenAgentStatisticsProps>
) {


  return (
    <styles.Section>
      <styles.TitleBox>
        <h2>{page.title}</h2>
        <p>{page.description}</p>
      </styles.TitleBox>

      <styles.Content_box>
        <Text_box>
          <p style={{fontSize: "18px"}}>{"XXX (@agent007)의 에이전트 수익 통계"}</p>
        </Text_box>

        <Date_box mt="20">
          <a className="prev">이전</a>
          <strong>2024년 12월 25일</strong>
          <a className="next">다음</a>
        </Date_box>

        <styles.Table_box mt="30">
          <styles.Table_body>
            <table>
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>주문 금액</th>
                  <th>거래 금액</th>
                  <th>수익</th>
                  <th>주문 횟수</th>
                  <th>거래 횟수</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>2024-06-09</td>
                  <td>0,000,000 KRW</td>
                  <td>0,000,000 KRW</td>
                  <td>0,000,000 KRW</td>
                  <td>2</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>2024-06-10</td>
                  <td>0,000,000 KRW</td>
                  <td>0,000,000 KRW</td>
                  <td>0,000,000 KRW</td>
                  <td>2</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>2024-06-11</td>
                  <td>0,000,000 KRW</td>
                  <td>0,000,000 KRW</td>
                  <td>0,000,000 KRW</td>
                  <td>2</td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
          </styles.Table_body>

        </styles.Table_box>



      </styles.Content_box>
    </styles.Section>
  );
}