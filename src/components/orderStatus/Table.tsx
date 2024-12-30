"use client";
import { useState } from "react";
import CustomAgGrid from "../common/agGrid/CustomAgGrid";
import { ColDef } from "ag-grid-community";
import { useQuery } from "@tanstack/react-query";
import callTms from "@/libraries/callTms";
import { Session } from "next-auth";
import { convertToStandardDateTime } from "@/utils/regexp";
import { Box, Divider, LoadingOverlay } from "@mantine/core";
import { TBW_100201_Q01 } from "@/types/api";
import { TUserlistDto } from "@/types/dto";
import css from "./Home.module.scss";

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

interface TableProps {
  session: Session;
  dto: TUserlistDto;
}

export default function Table({ session, dto }: TableProps) {
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

  // const { data } = useQuery({
  //   queryKey: ["TBW_106000_Q02", count],
  //   queryFn: async () => {
  //     const res = await callTms<TBW_106000_Q02>({
  //       session,
  //       svcId: "TBW_106000_Q02",
  //       data: [
  //         session.user.corpCd,
  //         instCd,
  //         iqryStrtDd,
  //         iqryEndDd,
  //         byslTp === "매도" ? "S" : byslTp === "매수" ? "B" : "",
  //       ],
  //     });
  //     const data = res.svcRspnData || [];
  //     return data;
  //   },
  //   enabled: count > 0,
  //   select: (data) => {
  //     return data.map((item: RspnDataItem<TBW_106000_Q02>) => {
  //       return {
  //         "주문 일시": convertToStandardDateTime(item.F01),
  //         "회사 코드": item.F02,
  //         "회사 명": item.F03,
  //         "계좌 번호": item.F04,
  //         "외부 사용자 ID": item.F05,
  //         "종목 코드": item.F06,
  //         "레버리지 크기": `${item.F07}x`,
  //         "호가 구분": convertAkprcTp(item.F08),
  //         "주문 가격 구분": convertOrdrPrcTp(item.F09),
  //         "매수매도 구분": item.F10 === "B" ? "매수" : "매도",
  //         "주문 가격": item.F11,
  //         "주문 수량": item.F12,
  //         "체결 수량": item.F13,
  //         "주문 일자": item.F14,
  //         "주문 일련번호": item.F15,
  //         "주문 구분": item.F16 === "N" ? "일반" : "RMS",
  //         "가격 소수점": item.F17,
  //         "수량 소수점": item.F18,
  //       };
  //     });
  //   },
  // });

  return (
    <>
      <Box mt={15}>
        <div className={css.resultBox}>
          <p>전체 : 15</p>
        </div>
      </Box>

      <Divider color="#fff" size={2} m="30px -45px" w="calc(100% + 90px)" />

      <div>
        <Box pos="relative">
          <CustomAgGrid data={[]} colDefs={colDefs} />
          <LoadingOverlay visible={true} overlayProps={{ radius: "sm", blur: 2 }} />
        </Box>
      </div>
    </>
  );
}
