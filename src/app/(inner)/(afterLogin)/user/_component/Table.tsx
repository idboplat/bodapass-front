"use client";
import { useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { GRID_COLS } from "../_const/colum";
import AgCustomTheme from "@/style/AgCustomTheme.style";
import { Session } from "next-auth";
import callTms from "@/model/callTms";
import Pagination from "@inner/(afterLogin)/_component/Pagination";
import { useAtom, useSetAtom } from "jotai";
import { nextUserListAtom, prevUserListAtom, userListAtom, userListKeyAtom } from "../_lib/atom";
import { B9001QData } from "@/type/api";
import { stringToDate, stringToDateTime } from "@/app/_lib/regexp";
import { ICellRendererParams, RowClickedEvent } from "ag-grid-community";
import UpdateUserButton from "./UpdateUserButton";

export type UserlistRowData = {
  "접속 여부": string;
  "사용자 ID": string;
  비밀번호: string;
  "사용자 명": string;
  이메일: string;
  전화번호: string;
  "사용자 레벨": string;
  메모: string;
  가입일시: string;
  구독시작일: string;
  구독만료일: string;
  cntuIqryKey: string;
};

interface UserlistProps {
  session: Session;
}

export default function Userlist({ session }: UserlistProps) {
  const [colDefs] = useState([
    ...GRID_COLS,
    {
      headerName: "",
      field: "update",
      cellRenderer: ({ node }: ICellRendererParams<UserlistRowData, undefined, undefined>) => {
        return <UpdateUserButton rowIndex={node.rowIndex} session={session} rowData={node.data!} />;
      },
      cellStyle: { justifyContent: "center" },
      width: 30,
    },
  ]);
  const [userListKey] = useAtom(userListKeyAtom);
  const setUserlist = useSetAtom(userListAtom);
  const next = useSetAtom(nextUserListAtom);
  const prev = useSetAtom(prevUserListAtom);

  const { data } = useQuery({
    queryKey: ["B9001Q", userListKey],
    queryFn: async () => {
      const B9001QRes = await callTms<B9001QData>({
        session,
        svcId: "B9001Q",
        data: [
          session.user.sessionId,
          session.user.sessionKey,
          userListKey.id,
          userListKey.name,
          userListKey.email,
          userListKey.tel,
          userListKey.level,
          userListKey.startDate,
          userListKey.endDate,
          userListKey.cntuIqryKey,
          "N",
        ],
      });

      const B9001QData = B9001QRes.svcRspnData || [];
      return B9001QData;
    },
    select: (data) => {
      return data.map((item) => ({
        "접속 여부": item.F01,
        "사용자 ID": item.F02,
        비밀번호: item.F03,
        "사용자 명": item.F04,
        이메일: item.F05,
        전화번호: item.F06,
        "사용자 레벨": item.F07,
        메모: item.F08,
        가입일시: stringToDateTime(item.F09),
        구독시작일: stringToDate(item.F10),
        구독만료일: stringToDate(item.F11),
        cntuIqryKey: item.F12,
      }));
    },
    enabled: userListKey.nonce > 0,
  });

  const onRowClicked = (event: RowClickedEvent<UserlistRowData>) => {
    const { data } = event;
    if (!data) return;
    setUserlist((pre) => ({
      ...pre,
      rowIndex: event.rowIndex,
    }));
  };

  const rowData = userListKey.nonce === 0 ? [] : data;

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
        currnetPage={userListKey.history.length + 1}
        disablePrev={userListKey.history.length === 0}
        disableNext={(data?.length || 0) < 15}
      />
    </>
  );
}
