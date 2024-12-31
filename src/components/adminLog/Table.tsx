"use client";
import { useState } from "react";
import CustomAgGrid from "../common/agGrid/CustomAgGrid";
import { ColDef } from "ag-grid-community";
import { Session } from "next-auth";
import { Box, LoadingOverlay } from "@mantine/core";
import { TAdminLogDto } from "@/types/dto";

interface TableProps {
  session: Session;
  dto: TAdminLogDto;
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
  ]);

  // const { data, isPending } = useQuery({
  //   queryKey: ["TBW_100201_Q01", dto],
  //   queryFn: async () => {
  //     const res = await callTms<TBW_100201_Q01>({
  //       session,
  //       svcId: "TBW_100201_Q01",
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
  //   enabled: dto.enabled,
  //   select: (data) => {
  //     return data.map((item) => {
  //       return {
  //         "주문 일시": convertToStandardDateTime(item.F01),
  //         "회사 코드": item.F02,
  //         "회사 명": item.F03,
  //         "계좌 번호": item.F04,
  //         "외부 사용자 ID": item.F05,
  //       };
  //     });
  //   },
  // });

  return (
    <Box pos="relative">
      <CustomAgGrid data={[]} colDefs={colDefs} />
      <LoadingOverlay visible={true} overlayProps={{ radius: "sm", blur: 2 }} />
    </Box>
  );
}
