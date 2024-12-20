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



interface ScreenOrderbookStatusProps {}


/** 유저/마켓관리 - 오더북 현황 */
export default function ScreenOrderbookStatus(
  { page, session }: HomeProps<ScreenOrderbookStatusProps>
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
            <button type="button" onClick={() => setOpenOrder(!openOrder)}><p id="select-button">전체 오더</p></button>
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

        {/** 주문 수 */}
        <styles.Table_box noWhite={true}>
          <styles.Table_head mt="15">
            <p>{"전체 : 4"}</p>
          </styles.Table_head>
        </styles.Table_box>

        <Line_box></Line_box>

        <styles.Table_box>
          <styles.Table_body>
            <table>
              <thead>
                <tr>
                  <th>일자</th>
                  <th>마켓</th>
                  <th>구분</th>
                  <th>아이디</th>
                  <th>이름</th>
                  <th><a >레버리지</a></th>
                  <th><a >가격</a></th>
                  <th><a >포지션</a></th>
                  <th><a >수령</a></th>
                  <th><a >증거금</a></th>
                </tr>
              </thead>

              <tbody>
							<tr>
								<td>2024-07-11 01:45:00</td>
								<td>BTCUSDT</td>
                <colors.Ft_blue>진입 - 롱</colors.Ft_blue>
								<td>user01</td>
								<td>유저1</td>
								<td>3x</td>
								<td>47,853.3usdt</td>
                <colors.Ft_blue>3.6178 BTC</colors.Ft_blue>
                <colors.Ft_blue>3.6178 BTC</colors.Ft_blue>
                <colors.Ft_blue>3.6178 BTC</colors.Ft_blue>
							</tr>
							<tr>
								<td>2024-07-11 01:45:00</td>
								<td>BTCUSDT</td>
                <colors.Ft_red>진입 - 숏</colors.Ft_red>
								<td>user01</td>
								<td>유저1</td>
								<td>3x</td>
								<td>47,853.3usdt</td>
                <colors.Ft_red>0.0433 BTC</colors.Ft_red>
                <colors.Ft_red>0.0433 BTC</colors.Ft_red>
                <colors.Ft_red>0.0433 BTC</colors.Ft_red>
							</tr>
						</tbody>
            </table>
          </styles.Table_body>
        </styles.Table_box>

      </styles.Content_box>
    </styles.Section>
  );
}