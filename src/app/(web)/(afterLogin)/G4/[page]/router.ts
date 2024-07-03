import DeployHome from "@balance/deploy/Home";
import TransactionHome from "@balance/transaction/Home";
import CorpHome from "@web/(afterLogin)/_component/management/corp/Home";
import EmplHome from "@web/(afterLogin)/_component/user/empl/home";
import { Path } from "@web/(afterLogin)/_lib/getPage";

export const G4_PATH_LIST: Path[] = [
  // {
  //   category: "운영",
  //   pages: [],
  // },
  {
    category: "사용자",
    pages: [{ title: "관리자 관리", number: "400202", Component: EmplHome }],
  },
  // {
  //   category: "로그",
  //   pages: [],
  // },
  {
    category: "잔고",
    pages: [
      {
        title: "GLE 구매 신청 내역(B2B)",
        number: "400502",
        Component: TransactionHome,
      },
      {
        title: "입출금 내역(B2C)",
        number: "400503",
        Component: TransactionHome,
      },
    ],
  },
  // {
  //   category: "현황",
  //   pages: [],
  // },
];
