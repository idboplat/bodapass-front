"use client";
import styled, { css } from "styled-components";
import * as styles from "../styled/contentboxStyled";
import * as colors from "../styled/colorboxStyled";
import { HomeProps } from "@/types/common";
import { Input_box } from "../styled/inputboxStyled";
import { Select_box } from "../styled/selectboxStyled";
import { Line_box } from "../styled/lineboxStyled";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import callTms from "@/libraries/callTms";
import { TBW_002000_S02, TBW_106000_Q02 } from "@/types/api";
import { convertToStandardDateTime } from "@/utils/regexp";
import { RspnDataItem } from "@/libraries/callTmsRft";
import { Button_box } from "../styled/buttonboxStyled";

const Flex_vc = styled.div`
  display: flex;
  flex-wrap: wrap !important;
  align-items: center !important;
  gap: 10px;
`;

interface ScreenOrderbookStatusProps {}

type OrderbookStatus = {
  creWrkDtm: string;
  corpCd: string;
  corpNm: string;
  acctNo: string;
  extnUserId: string;
  instCd: string;
  lvrgSize: string;
  akrpcTp: string;
  ordrPrcTp: string;
  byslTp: string;
  ordrPrc: string;
  ordrQty: string;
  mtchQty: string;
  ordrDd: string;
  ordrSn: string;
  ordrTp: string;
  prcDp: string;
  qtyDp: string;
}

const convertAkprcTp = (akrpcTp: string) => {
  switch (akrpcTp) {
    case "N":
      return "신규";
    case "M":
      return "정정";
    case "C":
       return "취소";
    default:
      return "";
  }
}

const convertOrdrPrcTp = (ordrPrcTp: string) => {
  switch (ordrPrcTp) {
    case "LM":
      return "지정가";
    case "MK":
      return "시장가";
    case "SL":
       return "스탑리밋";
    case "SM":
      return "스탑마켓";
    default:
      return "";
  }
}

/** 유저/마켓관리 - 오더북 현황 */
export default function ScreenOrderbookStatus({
  page,
  session,
}: HomeProps<ScreenOrderbookStatusProps>) {
  // const [openMarket, setOpenMarket] = useState(false);
  // const [openOrder, setOpenOrder] = useState(false);
  // const [openId, setOpenId] = useState(false);


  const [instCd, setInstCd] = useState("");
  const [iqryStrtDd, setIqryStrtDd] = useState("");
  const [iqryEndDd, setIqryEndDd] = useState("");
  const [byslTp, setByslTp] = useState("");
  const [count, setCount] = useState(0);
  
  const { data, isLoading } = useQuery({
    queryKey: ["TBW_106000_Q02", count,],
    queryFn: async () => {
      const res = await callTms<TBW_106000_Q02>({
        session,
        svcId: "TBW_106000_Q02",
        data: [
          session.user.corpCd,
          instCd,
          iqryStrtDd,
          iqryEndDd,
          byslTp === "매도" ? "S" : byslTp === "매수" ? "B" : "",
        ],
      });
      const data = res.svcRspnData || [];
      return data;
    },
    enabled: count > 0,
    select: (data) => {
      return {
        result:
          data?.map((item: RspnDataItem<TBW_106000_Q02>) => ({
            creWrkDtm: convertToStandardDateTime(item.F01),
            corpCd: item.F02,
            corpNm: item.F03,
            acctNo: item.F04,
            extnUserId: item.F05,
            instCd: item.F06,
            lvrgSize: `${item.F07}x`,
            akrpcTp: convertAkprcTp(item.F08),
            ordrPrcTp: convertOrdrPrcTp(item.F09),
            byslTp: item.F10 === "B" ? "매수" : "매도",
            ordrPrc: item.F11,
            ordrQty: item.F12,
            mtchQty: item.F13,
            ordrDd: item.F14,
            ordrSn: item.F15,
            ordrTp: item.F16 === "N" ? "일반" : "RMS",
            prcDp: item.F17,
            qtyDp: item.F18,
          })) || [],
      };
    },
  });

  const handleSearch = () => {
    setCount((prev) => prev + 1);
  }

  return (
    <styles.Section>
      <styles.TitleBox>
        <h2>{page.title}</h2>
        <p>{page.description}</p>
      </styles.TitleBox>

      <styles.Content_box>
        <Flex_vc>
          {/** 마켓 선택 */}
          {/* <Select_box openType={openMarket} style={{ width: "250px", marginRight: "17px" }}>
            <button type="button" onClick={() => setOpenMarket(!openMarket)}>
              <p id="select-button">전체 마켓</p>
            </button>
            <div>
              <dl>
                <dd className="">
                  <a>
                    <p>select list 1</p>
                  </a>
                </dd>
                <dd className="">
                  <a>
                    <p>select list 2</p>
                  </a>
                </dd>
              </dl>
            </div>
          </Select_box> */}

          {/** 주문 유형 선택 (전체, 롱, 숏) */}
          {/* <Select_box openType={openOrder} style={{ width: "250px", marginRight: "17px" }}>
            <button type="button" onClick={() => setOpenOrder(!openOrder)}>
              <p id="select-button">전체 오더</p>
            </button>
            <div>
              <dl>
                <dd className="">
                  <a>
                    <p>select list 1</p>
                  </a>
                </dd>
                <dd className="">
                  <a>
                    <p>select list 2</p>
                  </a>
                </dd>
              </dl>
            </div>
          </Select_box> */}

          {/** 아이디 */}
          {/* <Select_box openType={openId} style={{ width: "250px", marginRight: "17px" }}>
            <button type="button" onClick={() => setOpenId(!openId)}>
              <p id="select-button">아이디</p>
            </button>
            <div>
              <dl>
                <dd className="">
                  <a>
                    <p>select list 1</p>
                  </a>
                </dd>
                <dd className="">
                  <a>
                    <p>select list 2</p>
                  </a>
                </dd>
              </dl>
            </div>
          </Select_box> */}

          {/** 검색어 설정 */}
       
          
          <Input_box >
            <input type="text" placeholder="종목코드" value={instCd}  onChange={(e) => setInstCd(e.target.value)} />
            <a className="search" onClick={handleSearch}>종목코드</a>
          </Input_box>
          <Input_box>
            <input type="text" placeholder="시작일" value={iqryStrtDd} onChange={(e) => setIqryStrtDd(e.target.value)}/>
            <a className="search"  onClick={handleSearch}>시작일</a>
          </Input_box> 
          <Input_box>
            <input type="text" placeholder="종료일" value={iqryEndDd} onChange={(e) => setIqryEndDd(e.target.value)}/>
            <a className="search"  onClick={handleSearch}>종료일</a>
          </Input_box>
          <Input_box>
            <input type="text" placeholder="매수/매도" value={byslTp} onChange={(e) => setByslTp(e.target.value)} />
            <a className="search"  onClick={handleSearch}>매수/매도</a>
          </Input_box>
          <Button_box>
                    <div style={{width: "110px"}}>
                      <a className="btn-active"  onClick={handleSearch}>검색</a>
                    </div>
                  </Button_box>
          {/* <Select_box openType={openByslTp} style={{ width: "250px", marginRight: "17px" }}>
            <button type="button" onClick={() =>setOpenByslTp(!openByslTp)}> 
              <p id="select-button">매수/매도</p>
            </button>
            <div>
              <dl>
                <dd className="">
                  <a>
                    <p>매수</p>
                  </a>
                </dd>
                <dd className="">
                  <a>
                    <p>매도</p>
                  </a>
                </dd>
              </dl>
            </div>
          </Select_box> */}
        </Flex_vc>

        {/** 주문 수 */}
        <styles.Table_box noWhite={true}>
          <styles.Table_head mt="15">
            <p>전체 : {data?.result.length || ""}</p>
          </styles.Table_head>
        </styles.Table_box>

        <Line_box></Line_box>

        <styles.Table_box>
          <styles.Table_body>
            <table>
              <thead>
                <tr>
                  <th>일자</th>
                  <th>회사코드</th>
                  <th>회사명</th>
                  <th>계좌번호</th>
                  <th>외부 사용자 ID</th>
                  <th>종목코드</th>
                  <th>레버리지 크기</th>
                  <th>호가 구분</th>
                  <th>주문 가격 구분</th>
                  <th>매수/매도</th>
                  <th>주문 가격</th>
                  <th>주문 수량</th>
                  <th>체결 수량</th>
                  <th>주문 일자</th>
                  <th>주문 일련번호</th>
                  <th>주문 구분</th>
                </tr>
              </thead>

              <tbody>
              
                {data?.result.map((item: OrderbookStatus, index: number) => (
                  <tr key={index}>
                    <td>{item.creWrkDtm}</td>
                    <td>{item.corpCd}</td>
                    <td>{item.corpNm}</td>
                    <td>{item.acctNo}</td>
                    <td>{item.extnUserId}</td>
                    <td>{item.instCd}</td>
                    <td>{item.lvrgSize}</td>
                    <td>{item.akrpcTp}</td>
                    <td>{item.ordrPrcTp}</td>
                    <td>{item.byslTp}</td>
                    <td>{item.ordrPrc}</td>
                    <td>{item.ordrQty}</td>
                    <td>{item.mtchQty}</td>
                    <td>{item.ordrDd}</td>
                    <td>{item.ordrSn}</td>
                    <td>{item.ordrTp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </styles.Table_body>
        </styles.Table_box>
      </styles.Content_box>
    </styles.Section>
  );
}
