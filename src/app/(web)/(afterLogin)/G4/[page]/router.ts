import DeployHome from "@transaction/deploy/Home";
import B2bHome from "@transaction/b2b/_component/Home";
import B2cHome from "@transaction/b2c/_component/Home";
import CorpHome from "@web/(afterLogin)/_component/management/corp/Home";
import AdminHome from "@web/(afterLogin)/_component/user/admin/home";
import { Path } from "@web/(afterLogin)/_lib/getPage";
import PnlHome from "@order/pnl/Home";
import ClientHome from "@user/client/home";
import OpenOrderHome from "@order/openOrder/Home";
import TradeHistoryHome from "@order/tradeHistory/Home";
import OrderHistoryHome from "@order/orderHistory/Home";

export const G4_PATH_LIST: Path[] = [
  // {
  //   category: "운영",
  //   pages: [],
  // },
  {
    category: "사용자",
    pages: [
      { title: "고객 관리", number: "400201", Component: ClientHome },
      { title: "관리자 관리", number: "400202", Component: AdminHome },
    ],
  },
  // {
  //   category: "로그",
  //   pages: [],
  // },
  {
    category: "주문",
    pages: [
      { title: "미체결 내역", number: "400401", Component: OpenOrderHome },
      { title: "주문 내역", number: "400402", Component: OrderHistoryHome },
      { title: "체결 내역", number: "400403", Component: TradeHistoryHome },
      { title: "고객 손익 내역", number: "400404", Component: PnlHome },
    ],
  },
  {
    category: "잔고",
    pages: [
      {
        title: "회사 입금 신청 내역",
        number: "400502",
        Component: B2bHome,
      },
      {
        title: "고객 입출금 신청 내역",
        number: "400503",
        Component: B2cHome,
      },
    ],
  },
  // {
  //   category: "현황",
  //   pages: [],
  // },
];
