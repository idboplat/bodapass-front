import { HomeProps } from "@/type/common";
import Nav from "./_component/Nav";
import Table from "./_component/Table";
import { GRID_100502_COLS } from "./_const/100502";
import { GRID_100503_COLS } from "./_const/100503";
import { GRID_200502_COLS } from "./_const/200502";
import { GRID_200503_COLS } from "./_const/200503";
import { GRID_400502_COLS } from "./_const/400502";
import { GRID_400503_COLS } from "./_const/400503";
import { Meta } from "./_const/meta";
import * as css from "./home.css";

interface TransactionHomeProps {}

export default async function TransactionHome({ session, page }: HomeProps<TransactionHomeProps>) {
  const title = page.number + " " + page.title;

  const map: Record<string, Meta> = {
    "100502": { cols: GRID_100502_COLS, svcId: "TBW_001000_Q01", showReqBtn: false },
    "100503": { cols: GRID_100503_COLS, svcId: "TBW_001000_R01", showReqBtn: false },
    "200502": { cols: GRID_200502_COLS, svcId: "TBW_001000_Q01", showReqBtn: true },
    "200503": { cols: GRID_200503_COLS, svcId: "TBW_001000_R01", showReqBtn: false },
    "400502": { cols: GRID_400502_COLS, svcId: "TBW_001000_Q01", showReqBtn: true },
    "400503": { cols: GRID_400503_COLS, svcId: "TBW_001000_R01", showReqBtn: false },
  };

  const meta = map[page.number];

  if (!meta) {
    throw new Error("페이지 정보를 찾을 수 없습니다.");
  }

  return (
    <div className={css.wrap}>
      <div className={css.title}>{title}</div>
      <Nav session={session} showReqBtn={meta.showReqBtn} />
      <Table meta={meta} session={session} />
    </div>
  );
}
