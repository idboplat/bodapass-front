"use client"
import * as styles from "../styled/contentboxStyled"
import * as colors from "../styled/colorboxStyled"
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


interface ScreenSubAgentStatisticsProps {}

/** 통계 - 하부 에이전트 수익 통계 */
export default function ScreenSubAgentStatistics(
  { page, session }: HomeProps<ScreenSubAgentStatisticsProps>
) {


  return (
    <styles.Section>
      <styles.TitleBox>
        <h2>{page.title}</h2>
        <p>{page.description}</p>
      </styles.TitleBox>

      <styles.Content_box>

        <Date_box>
          <a className="prev">이전</a>
          <strong>2024년 12월 25일</strong>
          <a className="next">다음</a>
        </Date_box>

        <styles.Table_box mt="30">
          <styles.Table_head>
            <p>
              <colors.Ft_gray style={{fontWeight: 600, marginRight: "15px"}}>2024년 12월 총합</colors.Ft_gray>
              <em style={{fontWeight: 600}}>총 주문 금액</em> : 00,000,000 KRW&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <em style={{fontWeight: 600}}>총 거래 금액</em> : 00,000,000 KRW&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <em style={{fontWeight: 600}}>총 수익</em> : 00,000,000 KRW
            </p>
            <Button_box mt="24">
              <div style={{width: "100px", marginRight: "10px"}}>
                <a className="btn btn-bd-active">CSV</a>
              </div>
              <div style={{width: "100px"}}>
                <a className="btn btn-bd-active">Excel</a>
              </div>
            </Button_box>
          </styles.Table_head>
          <styles.Table_body>
            <table>
              <thead>
                <tr>
                  <th><a >에이전트명</a></th>
                  <th>주문 금액</th>
                  <th>거래 금액</th>
                  <th>수익</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>agent1</td>
                  <td>00,000,000 KRW</td>
                  <td>00,000,000 KRW</td>
                  <td>00,000,000 KRW</td>
                </tr>
                <tr>
                  <td>agent2</td>
                  <td>00,000,000 KRW</td>
                  <td>00,000,000 KRW</td>
                  <td>00,000,000 KRW</td>
                </tr>
                <tr>
                  <td>agent3</td>
                  <td>00,000,000 KRW</td>
                  <td>00,000,000 KRW</td>
                  <td>00,000,000 KRW</td>
                </tr>
                <tr>
                  <td>agent4</td>
                  <td>00,000,000 KRW</td>
                  <td>00,000,000 KRW</td>
                  <td>00,000,000 KRW</td>
                </tr>
              </tbody>
            </table>
          </styles.Table_body>

        </styles.Table_box>



      </styles.Content_box>
    </styles.Section>
  );
}