import AdminHome from "@/components/admin/home";
import B2bHome from "@/components/b2b/Home";
import B2bConsignHome from "@/components/b2bConsign/Home";
import ClientHome from "@/components/client/home";
import CorpHome from "@/components/corp/Home";
import OpenOrderHome from "@/components/openOrder/Home";
import OrderHistoryHome from "@/components/orderHistory/Home";
import PnlHome from "@/components/pnl/Home";
import TradeHistoryHome from "@/components/tradeHistory/Home";
import { Path } from "@/utils/getPage";

export const G3_PATH_LIST: Path[] = [
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
    category: "입출금",
    pages: [
      {
        category: "회사 입금 신청 내역",
        pages: [
          { title: "당사 입금 신청 내역", number: "200502", Component: B2bHome },
          { title: "위탁 입금 신청 내역", number: "200512", Component: B2bConsignHome },
        ],
      },
    ],
  },
];
