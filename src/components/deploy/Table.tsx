"use client";

import callTms from "@/libraries/callTms";
import { TDeployDto } from "@/types/dto";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";
import CustomAgGrid from "../common/agGrid/CustomAgGrid";
import { Box, LoadingOverlay, Pagination } from "@mantine/core";
import { TBW_100501_Q01 } from "@/types/api";
import { useState } from "react";
import { ColDef } from "ag-grid-community";

interface Props {
  session: Session;
  dto: TDeployDto;
}

const PAGE_SIZE = 20;

export default function Table({ session, dto }: Props) {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(-1);
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

  const { data, isFetching } = useQuery({
    queryKey: ["TBW_100501_Q01", dto, page],
    queryFn: async () => {
      const TBW_100501_Q01Res = await callTms<TBW_100501_Q01>({
        svcId: "TBW_100501_Q01",
        session,
        pgSize: PAGE_SIZE,
        pgSn: page,
        data: [dto.corpCd, dto.startDd, dto.endDd],
      });

      setMaxPage(() => Math.ceil(TBW_100501_Q01Res?.svcTotRecCnt / PAGE_SIZE));
      return { rows: TBW_100501_Q01Res?.svcRspnData || [] };
    },
    enabled: !!dto.enabled,
    select: (data) => data.rows.map((item) => ({})),
  });

  return (
    <Box pos="relative">
      <CustomAgGrid colDefs={colDefs} data={data || []} isShowNoRowsOverlay={!!dto.enabled} />
      {maxPage > -1 && (
        <Pagination
          value={page}
          total={maxPage}
          size="sm"
          color="#667DFF"
          onChange={(v) => setPage(() => v)}
        />
      )}
      <LoadingOverlay visible={isFetching} overlayProps={{ radius: "sm", blur: 2 }} />
    </Box>
  );
}
