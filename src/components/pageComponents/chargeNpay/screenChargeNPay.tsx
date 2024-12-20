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

import PartCharge from "./PartCharge"
import PartPay from "./PartPay"

import { useState } from "react"


interface ScreenChargeNPayProps {}

/** 입금/출금 */
export default function ScreenChargeNPay(
  { page, session }: HomeProps<ScreenChargeNPayProps>
) {

  const [selectedType, setSelectedType] = useState(0);


  return (
    <styles.Section>
      <styles.TitleBox>
        <h2>{page.title}</h2>
        <p>{page.description}</p>
      </styles.TitleBox>

      <styles.Content_box>
        <Tab_box>
          <ul>
            <li className={selectedType === 0 ? "active" : ""}><a onClick={() => setSelectedType(0)}>입금 내역</a></li>
            <li className={selectedType === 1 ? "active" : ""}><a onClick={() => setSelectedType(1)}>출금 내역</a></li>
          </ul>
        </Tab_box>

        <Line_box></Line_box>


        {/** 입금 */}
        { selectedType === 0 && <PartCharge session={session} />}
        {/** 출금 */}
        { selectedType === 1 && <PartPay session={session} />}

      </styles.Content_box>
    </styles.Section>
  );

}