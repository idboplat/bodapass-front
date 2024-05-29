import callTms from "@/model/callTms";
import AgCustomTheme from "@/style/AgCustomTheme.style";
import { B9011QData } from "@/type/api";
import Pagination from "@/app/(web)/(afterLogin)/_component/Pagination";
import { useQuery } from "@tanstack/react-query";
import { ICellRendererParams, RowClickedEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useAtom, useSetAtom } from "jotai";
import { Session } from "next-auth";
import { useState } from "react";
import { SUBSCRIBE_RECEPTION_GRID_COLS } from "../../_const/colum";
import {
  nextSubscribeDetailsAtom,
  prevSubscribeDetailsAtom,
  subscribeChartTypeAtom,
  subscribeDetailsAtom,
} from "../../_lib/atom";
import DeleteButton from "./DeleteButton";
import { stringToDate } from "@/app/_lib/regexp";

type RowData = {
  사용자ID: string;
  사용자명: string;
  구독번호: string;
  구독시작일: string;
  구독만료일: string;
  cntuIqryKey: string;
};

interface DetailsProps {
  session: Session;
}

export default function Table({ session }: DetailsProps) {
  const [colDefs] = useState([
    ...SUBSCRIBE_RECEPTION_GRID_COLS,
    {
      headerName: "",
      field: "delete",
      cellRenderer: ({ node }: ICellRendererParams<RowData, undefined, undefined>) => {
        return <DeleteButton rowIndex={node.rowIndex} session={session} />;
      },
      cellStyle: { justifyContent: "center" },
      width: 30,
    },
  ]);
  const [subscribeDetails] = useAtom(subscribeDetailsAtom);
  const next = useSetAtom(nextSubscribeDetailsAtom);
  const prev = useSetAtom(prevSubscribeDetailsAtom);
  const setChartType = useSetAtom(subscribeChartTypeAtom);

  const { data } = useQuery({
    queryKey: ["B9011Q", subscribeDetails],
    queryFn: async () => {
      const B9011QRes = await callTms<B9011QData>({
        session,
        svcId: "B9011Q",
        data: [
          session.user.sessionId,
          session.user.sessionKey,
          subscribeDetails.userId,
          subscribeDetails.baseDt,
          subscribeDetails.cntuIqryKey,
          "N", //csvDownYn
        ],
      });
      const B9011QData = B9011QRes.svcRspnData || [];
      return B9011QData;
    },
    select: (data) => {
      return data.map((item) => ({
        사용자ID: item.F01,
        사용자명: item.F02,
        구독번호: item.F03,
        구독시작일: stringToDate(item.F04),
        구독만료일: stringToDate(item.F05),
        cntuIqryKey: item.F06,
      }));
    },
    enabled: subscribeDetails.nonce > 0,
  });

  const onRowClicked = (event: RowClickedEvent<RowData>) => {
    const { data, rowIndex } = event;
    if (!data) return;
    setChartType((pre) => ({
      rowIndex,
      userId: data.사용자ID,
      subscrSn: data.구독번호,
      nonce: pre.nonce + 1,
    }));
  };

  const rowData = subscribeDetails.nonce === 0 ? [] : data;

  return (
    <>
      <AgCustomTheme className="ag-theme-alpine" isScroll={true} height={600}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          headerHeight={28}
          rowHeight={28}
          onRowClicked={onRowClicked}
        />
      </AgCustomTheme>
      <Pagination
        next={() => {
          const lastData = data?.at(-1);
          if (lastData) next(lastData.cntuIqryKey);
        }}
        prev={prev}
        currnetPage={subscribeDetails.history.length + 1}
        disableNext={(data?.length || 0) < 15}
        disablePrev={subscribeDetails.history.length === 0}
      />
    </>
  );
}
