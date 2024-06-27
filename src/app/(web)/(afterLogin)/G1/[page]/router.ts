import DeployHome from "@balance/deploy/Home";
import TransactionHome from "@balance/transaction/Home";
import CorpHome from "@web/(afterLogin)/_component/management/corp/Home";
import EmplHome from "@web/(afterLogin)/_component/user/empl/home";
import { Path } from "@web/(afterLogin)/_lib/getPage";

export const G1_PATH_LIST: Path[] = [
  {
    category: "운영",
    pages: [{ title: "회사 관리", number: "100101", Component: CorpHome }],
  },
  {
    category: "사용자",
    pages: [{ title: "관리자 관리", number: "100202", Component: EmplHome }],
  },
  // {
  //   category: "로그",
  //   pages: [],
  // },
  {
    category: "잔고",
    pages: [
      { title: "발행내역", number: "100501", Component: DeployHome },
      { title: "입출금 내역(전체)", number: "100502", Component: TransactionHome },
    ],
  },
  // {
  //   category: "현황",
  //   pages: [],
  // },
];
