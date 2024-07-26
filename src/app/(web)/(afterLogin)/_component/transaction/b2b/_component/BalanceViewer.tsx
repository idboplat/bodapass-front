"use client";

import callTms from "@/model/callTms";
import { TBW_002000_S02 } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";
import * as css from "./nav.css";
import { useTransactionCorpStore } from "../_lib/store";
import PlaceHolder from "@/app/_component/loading/Placeholder";

export default function BalanceViewer({ session }: { session: Session }) {
  const transactionStore = useTransactionCorpStore();

  const { data, isLoading } = useQuery({
    queryKey: ["TBW_002000_S02"],
    queryFn: async () => {
      const res = await callTms<TBW_002000_S02>({
        session,
        svcId: "TBW_002000_S02",
        data: [session.user.corpCd, "USDL"],
      });
      const data = res.svcRspnData || [];
      return data;
    },
  });

  const balance = data ? data[0].F01 : "";

  return (
    <div className={css.viewWrap}>
      <span className={css.viewTitle}>보유잔고 : </span>
      {isLoading ? <PlaceHolder style={{ width: 100, height: 14 }} /> : <span>{balance}</span>}
      <span> USDL</span>
    </div>
  );
}
