"use client";
import { MVIO_RMRK_ITEM, MVIO_TP_ITEM, RGST_STAT_ITEM, convertText } from "@/app/_const/tp";
import { dateToString } from "@/app/_lib/dateFormatter";
import { convertToStandardDateTime } from "@/app/_lib/regexp";
import callTms from "@/model/callTms";
import { TBW_006000_R01 } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import classNames from "classnames";
import { Session } from "next-auth";
import { useState } from "react";
import { GRID_COLS } from "../_const/colum";
import { usePnlStore } from "../_lib/store";
import { tableWrap } from "./table.css";

interface TableProps {
  session: Session;
}

export default function Table({ session }: TableProps) {
  const [colDefs] = useState([...GRID_COLS]);
  const pnlStore = usePnlStore();

  const { data } = useQuery({
    queryKey: ["TBW_006000_R01", pnlStore],
    queryFn: async () => {
      const TBW_000000_R01Res = await callTms<TBW_006000_R01>({
        session,
        svcId: "TBW_006000_R01",
        data: [
          session.user.corpCd,
          dateToString(pnlStore.mvioDd),
          pnlStore.instCd,
          pnlStore.mvioTp,
        ],
        pgSize: 20,
      });
      const TBW_000000_R01Data = TBW_000000_R01Res.svcRspnData || [];
      return TBW_000000_R01Data;
    },
    select: (data) => {
      const result = data.map((item) => ({
        "회사 코드": item.F01,
        일자: item.F02,
        일련번호: item.F03,
        "계좌 번호": item.F04,
        "사용자 ID": item.F05,
        "종목 코드": item.F06,
        "입출 구분": convertText(MVIO_TP_ITEM, item.F07),
        "적요 구분": convertText(MVIO_RMRK_ITEM, item.F08),
        수량: item.F09,
        "잔고 수량": item.F10,
        "신청 상태 구분": convertText(RGST_STAT_ITEM, item.F11),
        "인덱스 체결 회사 코드": item.F12,
        "체결 일자": item.F13,
        "체결 번호": item.F14,
        "인덱스 체결 계좌 번호": item.F15,
        작업자: item.F16,
        "생성 일시": convertToStandardDateTime(item.F17),
        수정자: item.F18,
        "수정 일시": convertToStandardDateTime(item.F19),
      }));
      return result;
    },
    enabled: pnlStore.nonce > 0,
  });

  const rowData = pnlStore.nonce === 0 ? [] : data;

  return (
    <div className={classNames("ag-theme-alpine", tableWrap)}>
      <AgGridReact
        columnDefs={colDefs}
        rowData={rowData}
        overlayNoRowsTemplate={
          pnlStore.nonce === 0 ? "<span></span>" : "<span>데이터가 없습니다.</span>"
        }
        headerHeight={28}
        rowHeight={28}
      />
    </div>
  );
}
