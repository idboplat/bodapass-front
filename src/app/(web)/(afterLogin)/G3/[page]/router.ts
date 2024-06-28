import DeployHome from "@balance/deploy/Home";
import TransactionHome from "@balance/transaction/Home";
import CorpHome from "@web/(afterLogin)/_component/management/corp/Home";
import EmplHome from "@web/(afterLogin)/_component/user/empl/home";
import { Path } from "@web/(afterLogin)/_lib/getPage";

export const G3_PATH_LIST: Path[] = [
  {
    category: "운영",
    pages: [],
  },
  {
    category: "사용자",
    pages: [],
  },
  // {
  //   category: "로그",
  //   pages: [],
  // },
  {
    category: "잔고",
    pages: [],
  },
  // {
  //   category: "현황",
  //   pages: [],
  // },
];
