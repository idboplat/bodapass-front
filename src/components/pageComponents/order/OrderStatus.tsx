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
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import CustomAgGrid from "@/components/common/agGrid/CustomAgGrid";

const Flex_vc = styled.div`
  display: flex;
  flex-wrap: wrap !important;
  align-items: center !important;
  gap: 10px;
`;

interface OrderStatusProps {}

type OrderStatus = {
  "주문 일시": string;
  "회사 코드": string;
  "회사 명": string;
  "계좌 번호": string;
  "외부 사용자 ID": string;
  "종목 코드": string;
  "레버리지 크기": string;
  "호가 구분": string;
  "주문 가격 구분": string;
  "매수매도 구분": string;
  "주문 가격": string;
  "주문 수량": string;
  "체결 수량": string;
  "주문 일자": string;
  "주문 일련번호": string;
  "주문 구분": string;
  "가격 소수점": string;
  "수량 소수점": string;
};

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
};

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
};

/** 주문내역 */
export default function OrderStatus({ page, session }: HomeProps<OrderStatusProps>) {
  const [instCd, setInstCd] = useState("");
  const [iqryStrtDd, setIqryStrtDd] = useState("");
  const [iqryEndDd, setIqryEndDd] = useState("");
  const [byslTp, setByslTp] = useState("");
  const [count, setCount] = useState(0);

  const [colDefs] = useState<ColDef[]>([
    {
      field: "주문 일시",
      width: 150,
    },
    {
      field: "회사 코드",
      width: 130,
    },
    {
      field: "회사 명",
      width: 225,
    },
    {
      field: "계좌 번호",
    },
    {
      field: "외부 사용자 ID",
      width: 130,
    },
    {
      field: "종목 코드",
      width: 120,
    },
    {
      field: "레버리지 크기",
      width: 120,
    },
    {
      field: "호가 구분",
      width: 120,
    },
    {
      field: "주문 가격 구분",
      width: 120,
    },
    {
      field: "매수매도 구분",
      width: 120,
    },
    {
      field: "주문 가격",
      width: 120,
    },
    {
      field: "주문 수량",
      width: 120,
    },
    {
      field: "체결 수량",
      width: 120,
    },
    {
      field: "주문 일자",
      width: 120,
    },
    {
      field: "주문 일련번호",
      width: 120,
    },
    {
      field: "주문 구분",
      width: 120,
    },
    {
      field: "가격 소수점",
      width: 120,
    },
    {
      field: "수량 소수점",
      width: 120,
    },
  ]);

  const { data } = useQuery({
    queryKey: ["TBW_106000_Q02", count],
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
      return data.map((item: RspnDataItem<TBW_106000_Q02>) => {
        return {
          "주문 일시": convertToStandardDateTime(item.F01),
          "회사 코드": item.F02,
          "회사 명": item.F03,
          "계좌 번호": item.F04,
          "외부 사용자 ID": item.F05,
          "종목 코드": item.F06,
          "레버리지 크기": `${item.F07}x`,
          "호가 구분": convertAkprcTp(item.F08),
          "주문 가격 구분": convertOrdrPrcTp(item.F09),
          "매수매도 구분": item.F10 === "B" ? "매수" : "매도",
          "주문 가격": item.F11,
          "주문 수량": item.F12,
          "체결 수량": item.F13,
          "주문 일자": item.F14,
          "주문 일련번호": item.F15,
          "주문 구분": item.F16 === "N" ? "일반" : "RMS",
          "가격 소수점": item.F17,
          "수량 소수점": item.F18,
        };
      });
    },
  });

  const handleSearch = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <>
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

            <Input_box>
              <input
                type="text"
                placeholder="종목코드"
                value={instCd}
                onChange={(e) => setInstCd(e.target.value)}
              />
              <a className="search" onClick={handleSearch}>
                종목코드
              </a>
            </Input_box>
            <Input_box>
              <input
                type="text"
                placeholder="시작일"
                value={iqryStrtDd}
                onChange={(e) => setIqryStrtDd(e.target.value)}
              />
              <a className="search" onClick={handleSearch}>
                시작일
              </a>
            </Input_box>
            <Input_box>
              <input
                type="text"
                placeholder="종료일"
                value={iqryEndDd}
                onChange={(e) => setIqryEndDd(e.target.value)}
              />
              <a className="search" onClick={handleSearch}>
                종료일
              </a>
            </Input_box>
            <Input_box>
              <input
                type="text"
                placeholder="매수/매도"
                value={byslTp}
                onChange={(e) => setByslTp(e.target.value)}
              />
              <a className="search" onClick={handleSearch}>
                매수/매도
              </a>
            </Input_box>
            <Button_box>
              <div style={{ width: "110px" }}>
                <a className="btn-active" onClick={handleSearch}>
                  검색
                </a>
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
              <p>전체 : {data?.length || ""}</p>
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
                  {/* {data?.map((item: OrderStatus, index: number) => (
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
                  ))} */}
                </tbody>
              </table>
            </styles.Table_body>
          </styles.Table_box>
        </styles.Content_box>
      </styles.Section>
      {/* <div className="topGrid ag-theme-alpine">
        <AgGridReact rowData={data || []} columnDefs={colDefs} headerHeight={38} rowHeight={26} />
      </div> */}
      <CustomAgGrid data={data || []} colDefs={colDefs} />
    </>
  );
}
