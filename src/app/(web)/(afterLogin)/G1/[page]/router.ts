import CorpHome from "@web/(afterLogin)/_component/management/corp/Home";
import EmplHome from "@web/(afterLogin)/_component/user/empl/home";
import { Path } from "@web/(afterLogin)/_lib/getPage";

export const G1_PATH_LIST: Path[] = [
  {
    운영: [{ title: "회사 관리", number: "100101", Component: CorpHome }],
  },
  {
    사용자: [{ title: "관리자 관리", number: "100202", Component: EmplHome }],
  },
  {
    로그: [],
  },
  {
    잔고: [
      { title: "발행내역", number: "100501", Component: CorpHome },
      { title: "입출금 내역(전체)", number: "100502", Component: CorpHome },
    ],
  },
  {
    현황: [],
  },
];
