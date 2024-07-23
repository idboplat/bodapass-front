import OpenOrderHome from "@order/openOrder/Home";
import PnlHome from "@order/pnl/Home";
import B2bHome from "@transaction/b2b/_component/Home";
import ClientHome from "@user/client/home";
import CorpHome from "@web/(afterLogin)/_component/management/corp/Home";
import AdminHome from "@web/(afterLogin)/_component/user/admin/home";
import { Path } from "@web/(afterLogin)/_lib/getPage";
import TradeHistoryHome from "@order/tradeHistory/Home";
import OrderHistoryHome from "@order/orderHistory/Home";

export const G2_PATH_LIST: Path[] = [
  {
    category: "운영",
    pages: [{ title: "회사 관리", number: "200101", Component: CorpHome }],
  },
  {
    category: "사용자",
    pages: [
      { title: "고객 관리", number: "200201", Component: ClientHome },
      { title: "관리자 관리", number: "200202", Component: AdminHome },
    ],
  },
  // {
  //   category: "로그",
  //   pages: [],
  // },
  {
    category: "주문",
    pages: [
      { title: "미체결 내역", number: "200401", Component: OpenOrderHome },
      { title: "주문 내역", number: "200402", Component: OrderHistoryHome },
      { title: "체결 내역", number: "200403", Component: TradeHistoryHome },
      { title: "고객 손익 내역", number: "200404", Component: PnlHome },
    ],
  },
  {
    category: "잔고",
    pages: [{ title: "회사 입금 신청 내역", number: "200502", Component: B2bHome }],
  },
  // {
  //   category: "현황",
  //   pages: [],
  // },
];
