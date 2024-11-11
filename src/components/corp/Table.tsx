"use client";
import PagePagination from "@/components/common/pagination/PagiPagination";
import { GRID_COLS } from "@/constants/corp/colum";
import callTms from "@/libraries/callTms";
import { useCorpStore } from "@/stores/corp";
import { TBW_000000_R01 } from "@/types/api";
import { CORP_GRP_ITEM, findEntity } from "@/types/tp";
import { convertToStandardDateTime } from "@/utils/regexp";
import { useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import classNames from "classnames";
import { Session } from "next-auth";
import { useState } from "react";
import css from "./Table.module.scss";

const PAGE_SIZE = 20;

interface TableProps {
  session: Session;
}

export default function Table({ session }: TableProps) {
  const [colDefs] = useState([...GRID_COLS]);
  const [total, setTotal] = useState(-1);
  const corpStore = useCorpStore();

  const { data } = useQuery({
    queryKey: ["TBW_000000_R01", corpStore],
    queryFn: async () => {
      const TBW_000000_R01Res = await callTms<TBW_000000_R01>({
        session,
        svcId: "TBW_000000_R01",
        data: [
          session.user.corpCd,
          corpStore.corpNm,
          findEntity(CORP_GRP_ITEM, corpStore.corpGrpTp)?.[0] || "",
        ],
        pgSize: PAGE_SIZE,
        pgSn: corpStore.page,
      });
      setTotal(() => TBW_000000_R01Res.svcTotRecCnt);
      const TBW_000000_R01Data = TBW_000000_R01Res.svcRspnData || [];
      return TBW_000000_R01Data;
    },
    select: (data) => {
      const result = data.map((item) => ({
        "회사 코드": item.F01,
        "회사 명": item.F02,
        "회사 유형": findEntity(CORP_GRP_ITEM, item.F03)?.[1] || "",
        "상위 회사 코드": item.F04,
        "상위 회사 명": item.F05,
        생성인: item.F06,
        "생성 일시": convertToStandardDateTime(item.F07),
      }));
      return result;
    },
    enabled: corpStore.nonce > 0,
  });

  const rowData = corpStore.nonce === 0 ? [] : data;

  return (
    <>
      <div className={classNames("ag-theme-alpine", css.tableWrap)}>
        <AgGridReact
          columnDefs={colDefs}
          rowData={rowData}
          overlayNoRowsTemplate={
            corpStore.nonce === 0 ? "<span></span>" : "<span>데이터가 없습니다.</span>"
          }
          headerHeight={28}
          rowHeight={28}
        />
      </div>
      {total !== -1 && (
        <PagePagination
          currentPage={corpStore.page}
          totalCnt={total}
          pgSize={PAGE_SIZE}
          groupSize={10}
          onChange={corpStore.actions.setPage}
        />
      )}
    </>
  );
}
