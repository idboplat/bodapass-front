//"use client"
import dynamic from "next/dynamic";
import { Session } from "next-auth";
import { useState, useEffect } from "react";
import { ClientPath } from "@/utils/getPage";
import Image from "next/image";

import * as header from "./headerStyled"

import logo from "../../../assets/images/logo.png"
import iconCate1 from "../../../assets/images/icon_header_cate_01.png"
import iconCate1On from "../../../assets/images/icon_header_cate_on_01.png"
import iconCate2 from "../../../assets/images/icon_header_cate_02.png"
import iconCate2On from "../../../assets/images/icon_header_cate_on_02.png"
import iconCate3 from "../../../assets/images/icon_header_cate_03.png"
import iconCate3On from "../../../assets/images/icon_header_cate_on_03.png"
import iconCate4 from "../../../assets/images/icon_header_cate_04.png"
import iconCate4On from "../../../assets/images/icon_header_cate_on_04.png"
import iconCate5 from "../../../assets/images/icon_header_cate_05.png"
import iconCate5On from "../../../assets/images/icon_header_cate_on_05.png"
import iconCate6 from "../../../assets/images/icon_header_cate_06.png"
import iconCate6On from "../../../assets/images/icon_header_cate_on_06.png"
import iconCate7 from "../../../assets/images/icon_header_cate_07.png"
import iconCate7On from "../../../assets/images/icon_header_cate_on_07.png"
import iconCate8 from "../../../assets/images/icon_header_cate_08.png"
import iconCate8On from "../../../assets/images/icon_header_cate_on_08.png"
import iconCate9 from "../../../assets/images/icon_header_cate_09.png"
import iconCate9On from "../../../assets/images/icon_header_cate_on_09.png"



const SessionTime = dynamic(() => import("./SessionTime"), { ssr: false });

interface HeaderProps {
  session: Session;
  pathList: ClientPath[];
  handleSubmit: (pageNumber: string) => void;
}

export default function Header({ session, pathList, handleSubmit }: HeaderProps) {

  const [indexCategory, setIndexCategory] = useState(0);
  const [indexMarket, setIndexMarket] = useState(1);
  const [indexAgent, setIndexAgent] = useState(0);
  const [indexStatistic, setIndexStatistic] = useState(0);

  // 큰 카테고리.
  function handleSubmitCate(params: number) {
    setIndexCategory(params);

    var pathContent: string = "";
    switch(params)
    {
      case 0: pathContent= `100101`; break;
      case 1: pathContent= `100201`; break;
      case 2: handleSubmitMarket(indexMarket); return;
      case 3: pathContent= `100401`; break;
      case 4: handleSubmitAgent(indexAgent); return;
      case 5: pathContent= `100601`; break;
      case 6: handleSubmitStatistic(indexStatistic) ; return;
      case 7: pathContent= `100801`; break;
      case 8: pathContent= `100901`; break;
      default: break;
    }

    handleSubmit(pathContent);
  }

  // 유저.마켓
  function handleSubmitMarket(params: number) {
    setIndexMarket(params);

    var pathContent: string = "";
    switch(params)
    {
      case 0: pathContent= `100301`; break;
      case 1: pathContent= `100302`; break;
      case 2: pathContent= `100303`; break;
      case 3: pathContent= `100304`; break;
      case 4: pathContent= `100305`; break;
      case 5: pathContent= `100306`; break;
      case 6: pathContent= `100307`; break;
      case 7: pathContent= `100308`; break;
      default: break;
    }

    handleSubmit(pathContent);
  }

  // 에이전트
  function handleSubmitAgent(params: number) {
    setIndexAgent(params);

    var pathContent: string = "";
    switch(params)
    {
      case 0: pathContent= `100501`; break;
      case 1: pathContent= `100502`; break;
      case 2: pathContent= `100503`; break;
      default: break;
    }

    handleSubmit(pathContent);
  }

  // 통계
  function handleSubmitStatistic(params: number) {
    setIndexStatistic(params);

    var pathContent: string = "";
    switch(params)
    {
      case 0: pathContent= `100701`; break;
      case 1: pathContent= `100702`; break;
      case 2: pathContent= `100703`; break;
      case 3: pathContent= `100704`; break;
      default: break;
    }

    handleSubmit(pathContent);
  }

  return (
    <header.HeaderWrap>
      <header.Header_logo>
        <h1>
          <a >
            <Image src={logo.src} alt="logo image" />
          </a>
        </h1>
      </header.Header_logo>

      <header.Header_cate>

        <ul>
          <header.Header_cate_li active={indexCategory == 0} normalImg={iconCate1.src} activeImg={iconCate1On.src}>
            <a onClick={() => {handleSubmitCate(0)}}>{pathList[0].category}</a>
          </header.Header_cate_li>
          <header.Header_cate_li active={indexCategory == 1} normalImg={iconCate2.src} activeImg={iconCate2On.src}>
            <a onClick={() => {handleSubmitCate(1)}}>마이페이지</a>
          </header.Header_cate_li>
          <header.Header_cate_li active={indexCategory == 2} normalImg={iconCate3.src} activeImg={iconCate3On.src}>
            <a onClick={() => {handleSubmitCate(2)}}>유저/마켓관리</a>
            <dl>
              {/* <header.Header_cate_dd active={indexMarket == 0} ><a onClick={() => {handleSubmitMarket(0)}}>트랜잭션 내역</a></header.Header_cate_dd> */}
              <header.Header_cate_dd active={indexMarket == 1} ><a onClick={() => {handleSubmitMarket(1)}}>유저 목록</a></header.Header_cate_dd>
              <header.Header_cate_dd active={indexMarket == 2} ><a onClick={() => {handleSubmitMarket(2)}}>출금 내역</a></header.Header_cate_dd>
              <header.Header_cate_dd active={indexMarket == 3} ><a onClick={() => {handleSubmitMarket(3)}}>마켓 목록</a></header.Header_cate_dd>
              <header.Header_cate_dd active={indexMarket == 4} ><a onClick={() => {handleSubmitMarket(4)}}>오더북 현황</a></header.Header_cate_dd>
              <header.Header_cate_dd active={indexMarket == 5} ><a onClick={() => {handleSubmitMarket(5)}}>포지션 현황</a></header.Header_cate_dd>
              <header.Header_cate_dd active={indexMarket == 6} ><a onClick={() => {handleSubmitMarket(6)}}>거래내역</a></header.Header_cate_dd>
              {/* <header.Header_cate_dd active={indexMarket == 7} ><a onClick={() => {handleSubmitMarket(7)}}>포지션 내역</a></header.Header_cate_dd> */}
					</dl>
          </header.Header_cate_li>
          {/* <header.Header_cate_li active={indexCategory == 3} normalImg={iconCate4.src} activeImg={iconCate4On.src}>
            <a onClick={() => {handleSubmitCate(3)}}>제한 사항</a>
          </header.Header_cate_li> */}
          <header.Header_cate_li active={indexCategory == 4} normalImg={iconCate5.src} activeImg={iconCate5On.src}>
            <a onClick={() => {handleSubmitCate(4)}}>에이전트 관리</a>
            <dl>
              <header.Header_cate_dd active={indexAgent == 0} ><a onClick={() => {handleSubmitAgent(0)}}>에이전트 내역</a></header.Header_cate_dd>
              <header.Header_cate_dd active={indexAgent == 1} ><a onClick={() => {handleSubmitAgent(1)}}>에이전트 목록</a></header.Header_cate_dd>
              <header.Header_cate_dd active={indexAgent == 2} ><a onClick={() => {handleSubmitAgent(2)}}>에이전트 생성</a></header.Header_cate_dd>
					</dl>
          </header.Header_cate_li>
          <header.Header_cate_li active={indexCategory == 5} normalImg={iconCate6.src} activeImg={iconCate6On.src}>
            <a onClick={() => {handleSubmitCate(5)}}>입금/출금</a>
          </header.Header_cate_li>
          <header.Header_cate_li active={indexCategory == 6} normalImg={iconCate7.src} activeImg={iconCate7On.src}>
            <a onClick={() => {handleSubmitCate(6)}}>통계</a>
            <dl>
              <header.Header_cate_dd active={indexStatistic == 0} ><a onClick={() => {handleSubmitStatistic(0)}}>정산관리</a></header.Header_cate_dd>
              <header.Header_cate_dd active={indexStatistic == 1} ><a onClick={() => {handleSubmitStatistic(1)}}>에이전트 수익 통계</a></header.Header_cate_dd>
              <header.Header_cate_dd active={indexStatistic == 2} ><a onClick={() => {handleSubmitStatistic(2)}}>하부 에이전트 수익 통계</a></header.Header_cate_dd>
					</dl>
          </header.Header_cate_li>
          <header.Header_cate_li active={indexCategory == 7} normalImg={iconCate8.src} activeImg={iconCate8On.src}>
            <a onClick={() => {handleSubmitCate(7)}}>개발자</a>
          </header.Header_cate_li>
          <header.Header_cate_li active={indexCategory == 8} normalImg={iconCate9.src} activeImg={iconCate9On.src}>
            <a onClick={() => {handleSubmitCate(8)}}>관리자</a>
          </header.Header_cate_li>
        </ul>
      </header.Header_cate>
    </header.HeaderWrap>
  );
}
