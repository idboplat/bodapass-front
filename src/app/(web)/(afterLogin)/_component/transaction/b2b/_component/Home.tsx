import { HomeProps } from "@/type/common";
import { GRID_COLS } from "../_const/col";
import { Meta } from "../_const/meta";
import * as css from "./home.css";
import Nav from "./Nav";
import Table from "./Table";

interface B2bHomeProps {}

export default async function B2bHome({ session, page }: HomeProps<B2bHomeProps>) {
  const title = page.number + " " + page.title;

  const map: Record<string, Meta> = {
    "100502": { cols: GRID_COLS, showReqBtn: false },
    "200502": { cols: GRID_COLS, showReqBtn: true },
    "400502": { cols: GRID_COLS, showReqBtn: true },
  };

  const meta = map[page.number];

  if (!meta) {
    throw new Error("페이지 정보를 찾을 수 없습니다.");
  }

  return (
    <div className={css.wrap}>
      <div className={css.title}>{title}</div>
      <Nav session={session} showReqBtn={meta.showReqBtn} />
      <Table session={session} meta={meta} />
    </div>
  );
}
