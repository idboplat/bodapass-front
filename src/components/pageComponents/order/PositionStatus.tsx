"use client"
import styled, { css } from "styled-components"
import * as styles from "../styled/contentboxStyled"
import * as colors from "../styled/colorboxStyled"
import { HomeProps } from "@/types/common"
import { Input_box } from "../styled/inputboxStyled"
import { Select_box } from "../styled/selectboxStyled"
import { Line_box } from "../styled/lineboxStyled"

import { useState } from "react"

const Flex_vc = styled.div`
  display:flex; 
  flex-wrap:wrap !important;
  align-items:center !important;
`;


interface PositionStatusProps {}

/** 주문 - 포지션 현황 */
export default function PositionStatus(
  { page, session }: HomeProps<PositionStatusProps>
) {

  const [openMarket, setOpenMarket] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [openId, setOpenId] = useState(false);



  return (
    <styles.Section>
      <styles.TitleBox>
        <h2>{page.title}</h2>
        <p>{page.description}</p>
      </styles.TitleBox>

      <styles.Content_box>
        {/** 검색 설정 */}
        <Flex_vc>
          {/** 마켓 선택 */}
          <Select_box openType={openMarket} style={{width: "250px", marginRight: "17px"}}>
            <button type="button" onClick={() => setOpenMarket(!openMarket)}><p id="select-button">전체 마켓</p></button>
            <div>
              <dl>
                <dd className=""><a ><p>select list 1</p></a></dd>
                <dd className=""><a ><p>select list 2</p></a></dd>
              </dl>
            </div>
          </Select_box>

          {/** 주문 유형 선택 (전체, 롱, 숏) */}
          <Select_box openType={openOrder} style={{width: "250px", marginRight: "17px"}}>
            <button type="button" onClick={() => setOpenOrder(!openOrder)}><p id="select-button">전체 주문</p></button>
            <div>
              <dl>
                <dd className=""><a ><p>select list 1</p></a></dd>
                <dd className=""><a ><p>select list 2</p></a></dd>
              </dl>
            </div>
          </Select_box>

          {/** 아이디 */}
          <Select_box openType={openId} style={{width: "250px", marginRight: "17px"}}>
            <button type="button" onClick={() => setOpenId(!openId)}><p id="select-button">아이디</p></button>
            <div>
              <dl>
                <dd className=""><a ><p>select list 1</p></a></dd>
                <dd className=""><a ><p>select list 2</p></a></dd>
              </dl>
            </div>
          </Select_box>

          {/** 검색어 설정 */}
          <Input_box flex1={true} >
            <input type="text" placeholder="검색어" />
            <a className="search">검색</a>
          </Input_box>
        </Flex_vc>

        {/** 포지션 수 */}
        <styles.Table_box noWhite={true}>
          <styles.Table_head mt="15">
            <p>결과 : 4</p>
          </styles.Table_head>
        </styles.Table_box>

        <Line_box></Line_box>

        <styles.Table_box>
          <styles.Table_body>
            <table>
              <thead>
                <tr>
                  <th>진입일자</th>
                  <th>마켓</th>
                  <th>구분</th>
                  <th>아이디</th>
                  <th>이름</th>
                  <th><a >평균가격</a></th>
                  <th><a >포지션</a></th>
                  <th><a >거래금액</a></th>
                  <th><a >증거금</a></th>
                  <th><a >정산가격</a></th>
                  <th><a >실현손익</a></th>
                  <th><a >미실현손익</a></th>
                  <th><a >클로즈 수량</a></th>
                </tr>
              </thead>

              <tbody>
							<tr>
								<td>2024-07-11 01:45:00</td>
								<td>BTCUSDT</td>
                <colors.Ft_blue>롱</colors.Ft_blue>
								<td>user01</td>
								<td>유저1</td>
								<td>60,522.6 USDT</td>
                <colors.Ft_blue>3.6178 BTC</colors.Ft_blue>
                <td>3.6178 BTC</td>
								<td>3.6178 BTC</td>
                <colors.Ft_red>3.6178 BTC</colors.Ft_red>
                <td>3.6178 BTC</td>
                <td>3.6178 BTC</td>
								<td>3.6178 BTC</td>
							</tr>
							<tr>
								<td>2024-07-11 01:45:00</td>
								<td>BTCUSDT</td>
                <colors.Ft_red>숏</colors.Ft_red>
								<td>user01</td>
								<td>유저1</td>
								<td>60,522.6 USDT</td>
                <colors.Ft_red>0.0433 BTC</colors.Ft_red>
								<td>3.6178 BTC</td>
								<td>3.6178 BTC</td>
                <colors.Ft_red>3.6178 USDT</colors.Ft_red>
								<td>3.6178 BTC</td>
                <td>3.6178 BTC</td>
								<td>3.6178 BTC</td>
							</tr>
						</tbody>
            </table>
          </styles.Table_body>
        </styles.Table_box>

      </styles.Content_box>
    </styles.Section>
  );

}