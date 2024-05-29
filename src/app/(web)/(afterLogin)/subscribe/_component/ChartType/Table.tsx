import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { SUBSCRIBE_CHART_TYPE_GRID_COLS } from "../../_const/colum";
import AgCustomTheme from "@/style/AgCustomTheme.style";
import { Session } from "next-auth";
import { useQuery } from "@tanstack/react-query";
import callTms from "@/model/callTms";
import { useAtom } from "jotai";
import { subscribeChartTypeAtom } from "../../_lib/atom";

interface ChartTypeProps {
  session: Session;
}
export default function Table({ session }: ChartTypeProps) {
  const [colDefs] = useState([...SUBSCRIBE_CHART_TYPE_GRID_COLS]);
  const [subscribeChartType] = useAtom(subscribeChartTypeAtom);

  const { data } = useQuery({
    queryKey: ["B9012Q", subscribeChartType],
    queryFn: async () => {
      const B9012QRes = await callTms({
        session,
        svcId: "B9012Q",
        data: [
          session.user.sessionId,
          session.user.sessionKey,
          subscribeChartType.userId,
          subscribeChartType.subscrSn,
        ],
      });
      const B9012QData = B9012QRes.svcRspnData;
      return B9012QData || [];
    },
    select: (data) => {
      return data.map((item) => ({
        사용자ID: item.F01,
        구독번호: item.F02,
        차트명: item.F03,
      }));
    },
    staleTime: 1000,
    enabled: subscribeChartType.nonce > 0,
  });

  const rowData = subscribeChartType.nonce === 0 ? [] : data;

  return (
    <AgCustomTheme className="ag-theme-alpine" isScroll={true} height={600}>
      <AgGridReact rowData={rowData} columnDefs={colDefs} headerHeight={28} rowHeight={28} />
    </AgCustomTheme>
  );
}
