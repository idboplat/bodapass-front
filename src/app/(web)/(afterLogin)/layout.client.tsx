"use client";

import Header from "@/components/common/header/Header";
import { Session } from "next-auth";
import { ClientPath } from "@/utils/getPage";
import { useApp } from "@/stores/app";
import { useStore } from "zustand";
import { useState, useEffect } from "react";
import { G1_PATH_LIST } from "./G1/[page]/router";
import { G2_PATH_LIST } from "./G2/[page]/router";
import { G4_PATH_LIST } from "./G4/[page]/router";
import { Page, Path, getPage } from "@/utils/getPage";

import ScreenDashboard from "@/components/pageComponents/screenDashboard";
import ScreenMy from "@/components/pageComponents/screenMy";
import ScreenAdmin from "@/components/pageComponents/screenAdmin";
import ScreenDeveloper from "@/components/pageComponents/screenDeveloper";
import ScreenTransaction from "@/components/pageComponents/userMarket/screenTransaction";
import ScreenUserList from "@/components/pageComponents/userMarket/screenUserList";
import ScreenPayment from "@/components/pageComponents/userMarket/screenPayment";
import ScreenMarketList from "@/components/pageComponents/userMarket/screenMarketList";
import ScreenOrderbookStatus from "@/components/pageComponents/order/OrderStatus";
import PositionStatus from "@/components/pageComponents/order/PositionStatus";
import TradeStatus from "@/components/pageComponents/order/TradeStatus";
import ScreenAgentStatus from "@/components/pageComponents/agents/screenAgentStatus";
import ScreenAgentList from "@/components/pageComponents/agents/screenAgentList";
import ScreenAgentRegister from "@/components/pageComponents/agents/screenAgentRegister";
import ScreenChargeNPay from "@/components/pageComponents/chargeNpay/screenChargeNPay";
import ScreenManagement from "@/components/pageComponents/statistics/screenManagement";
import ScreenAgentStatistics from "@/components/pageComponents/statistics/screenAgentStatistics";
import ScreenSubAgentStatistics from "@/components/pageComponents/statistics/screenSubAgentStatistics";
import OpenOrderStatus from "@/components/pageComponents/order/OpenOrderStatus";
import PnlStatus from "@/components/pageComponents/order/PnlStatus";

interface LayoutClientProps {
  clientPath: ClientPath[];
  children: React.ReactNode;
  session: Session;
}

export default function LayoutClient({ children, clientPath, session }: LayoutClientProps) {
  const store = useApp();

  const pathMap: Record<string, Path[]> = {
    G1: G1_PATH_LIST,
    G2: G2_PATH_LIST,
    G3: G2_PATH_LIST, // G3는 G2와 동일한 페이지를 사용
    G4: G4_PATH_LIST,
  };
  const paths = pathMap[session.user.corpGrpTp];

  const [pageName, setPageName] = useState("100101");
  const [pathPage, setPathPage] = useState<Page | null>(null);

  const handleMovePath = (pageNumber: string) => {
    //console.log("get Path Nm: ", pageNumber);
    if (pageNumber !== "") {
      const page = getPage(paths, pageNumber);
      if (page) {
        setPageName(pageNumber);
        setPathPage(page);
      }
    }
  };

  useEffect(() => {
    const page = getPage(paths, pageName);
    if (page) {
      setPathPage(page);
    }
  }, []);

  return (
    <>
      <Header
        session={session}
        pathList={clientPath}
        handleSubmit={(pageNumber) => handleMovePath(pageNumber)}
      />
      {/* {children} */}

      {/* ---------------------------------------------------------------- */}

      {/* 대시보드 */}
      {pageName === "100101" && pathPage && <ScreenDashboard page={pathPage} session={session} />}
      {/* 마이페이지 */}
      {pageName === "100201" && pathPage && <ScreenMy page={pathPage} session={session} />}

      {/* 사용안함 */}
      {pageName === "100301" && pathPage && <ScreenTransaction page={pathPage} session={session} />}
      {/* 유저/마켓관리 - 유저목록 */}
      {pageName === "100302" && pathPage && <ScreenUserList page={pathPage} session={session} />}
      {/* 유저/마켓관리 - 지급내역 */}
      {pageName === "100303" && pathPage && <ScreenPayment page={pathPage} session={session} />}
      {/* 유저/마켓관리 - 마켓목록 */}
      {pageName === "100304" && pathPage && <ScreenMarketList page={pathPage} session={session} />}

      {/* 주문 - 포지션내역 */}
      {pageName === "100401" && pathPage && <PositionStatus page={pathPage} session={session} />}
      {/* 주문 - 미체결내역 */}
      {pageName === "100402" && pathPage && <OpenOrderStatus page={pathPage} session={session} />}
      {/* 주문 - 주문내역 */}
      {pageName === "100403" && pathPage && (
        <ScreenOrderbookStatus page={pathPage} session={session} />
      )}
      {/* 주문 - 체결내역 */}
      {pageName === "100404" && pathPage && <TradeStatus page={pathPage} session={session} />}
      {/* 주문 - 고객 손익내역 */}
      {pageName === "100405" && pathPage && <PnlStatus page={pathPage} session={session} />}

      {/* 에이전트 관리 - 에이전트 내역 */}
      {pageName === "100501" && pathPage && <ScreenAgentStatus page={pathPage} session={session} />}
      {/* 에이전트 관리 - 에이전트 목록 */}
      {pageName === "100502" && pathPage && <ScreenAgentList page={pathPage} session={session} />}
      {/* 에이전트 관리 - 에이전트 생성 */}
      {pageName === "100503" && pathPage && (
        <ScreenAgentRegister page={pathPage} session={session} />
      )}

      {/* 입금/출금 */}
      {pageName === "100601" && pathPage && <ScreenChargeNPay page={pathPage} session={session} />}

      {/* 통계 - 정산관리 */}
      {pageName === "100701" && pathPage && <ScreenManagement page={pathPage} session={session} />}
      {/* 통계 - 에이전트 수익 통계 */}
      {pageName === "100702" && pathPage && (
        <ScreenAgentStatistics page={pathPage} session={session} />
      )}
      {/* 통계 - 하부 에이전트 수익 통계 */}
      {pageName === "100703" && pathPage && (
        <ScreenSubAgentStatistics page={pathPage} session={session} />
      )}

      {/* 개발자 */}
      {pageName === "100801" && pathPage && <ScreenDeveloper page={pathPage} session={session} />}

      {/* 관리자 */}
      {pageName === "100901" && pathPage && <ScreenAdmin page={pathPage} session={session} />}
    </>
  );
}
