"use client";
import callTms from "@/model/callTms";
import { TBW_002000_S02 } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";
import * as css from "../b2b/_component/nav.css";
import PlaceHolder from "@/app/_component/loading/Placeholder";
import { sortDecimal } from "@/app/_lib/numberFormatter";
import { useApp } from "@/app/_lib/appStore";
import { useStore } from "zustand";

export default function BalanceViewer({ session }: { session: Session }) {
  const app = useApp();
  const fiat = useStore(app, (store) => store.fiat);

  const { data, isLoading } = useQuery({
    queryKey: ["TBW_002000_S02", fiat],
    queryFn: async () => {
      const res = await callTms<TBW_002000_S02>({
        session,
        svcId: "TBW_002000_S02",
        data: [session.user.corpCd, "USDL", fiat.toUpperCase()],
      });
      const data = res.svcRspnData || [];
      return data;
    },
  });

  const balance = data ? parseFloat(data[0].F01).toFixed(2) : "";

  const price = data ? parseFloat(data[0].F01) * parseFloat(data[0].F02) : "";
  const convertedPrice = sortDecimal({
    num: price.toString(),
    decimalLength: 0,
    requireComma: true,
  });

  return (
    <div className={css.viewWrap}>
      <span>회사 보유잔고 : </span>
      {isLoading ? (
        <PlaceHolder style={{ width: 180, height: 20, marginLeft: 7 }} />
      ) : (
        <div>
          <span>{balance} USDL</span>
          <sub>≒ {convertedPrice} KRW</sub>
        </div>
      )}
    </div>
  );
}
