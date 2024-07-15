import { Path } from "@web/(afterLogin)/_lib/getPage";
import AdminHome from "@web/(afterLogin)/_component/user/admin/home";
import B2bHome from "@transaction/b2b/_component/Home";
import CorpHome from "@management/corp/Home";

export const G3_PATH_LIST: Path[] = [
  {
    category: "운영",
    pages: [{ title: "회사 관리", number: "200101", Component: CorpHome }],
  },
  {
    category: "사용자",
    pages: [{ title: "관리자 관리", number: "200202", Component: AdminHome }],
  },
  // {
  //   category: "로그",
  //   pages: [],
  // },
  {
    category: "잔고",
    pages: [{ title: "회사 입금 신청 내역", number: "200502", Component: B2bHome }],
  },
];
