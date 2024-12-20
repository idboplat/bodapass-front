"use client"
import * as styles from "../styled/contentboxStyled"
import * as colors from "../styled/colorboxStyled"
import { HomeProps } from "@/types/common"
import { Line_box } from "../styled/lineboxStyled"
import { useState } from "react"



interface ScreenMarketListProps {}

/** 유저/마켓관리 - 마켓 목록 */
export default function ScreenMarketList(
  { page, session }: HomeProps<ScreenMarketListProps>
) {



  return (
    <styles.Section>
      <styles.TitleBox>
        <h2>{page.title}</h2>
        <p>{page.description}</p>
      </styles.TitleBox>

      <styles.Content_box>
        {/** 마켓 갯수 / 신규등록 */}
        <styles.Table_box noWhite={true}>
          <styles.Table_head>
            <p>{"전체 : 4"}</p>
            <a >{"+ 마켓 신규등록"}</a>
          </styles.Table_head>
        </styles.Table_box>

        <Line_box></Line_box>

        <styles.Table_box>
          <styles.Table_body>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>마켓심벌</th>
                  <th>거래 코인</th>
                  <th>결제 코인</th>
                  <th><a >최소 거래수량</a></th>
                  <th><a >호가 단위</a></th>
                  <th><a >최소 주문금액</a></th>
                  <th><a >최대 주문금액</a></th>
                  <th>마켓상태</th>
                  <th>거래가능</th>
                  <th>액션</th>
                </tr>
              </thead>

              <tbody>
							<tr>
								<td>1</td>
								<td>BTCUSDT</td>
								<td>BTC</td>
								<td>USDT</td>
								<td>0.0001 <em>(BTC)</em></td>
								<td>0.1 <em>(USDT)</em></td>
								<td>10 <em>(USDT)</em></td>
								<td>1,000,000 <em>(USDT)</em></td>
                <colors.Ft_red>마켓운영</colors.Ft_red>
                <colors.Ft_green>거래정상</colors.Ft_green>
								<td></td>
							</tr>
							<tr>
								<td>1</td>
								<td>BTCUSDT</td>
								<td>BTC</td>
								<td>USDT</td>
								<td>0.0001 <em>(BTC)</em></td>
								<td>0.1 <em>(USDT)</em></td>
								<td>10 <em>(USDT)</em></td>
								<td>1,000,000 <em>(USDT)</em></td>
                <colors.Ft_red>마켓중지</colors.Ft_red>
                <colors.Ft_green>거래정상</colors.Ft_green>
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