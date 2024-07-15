import { HomeProps } from "@/type/common";
import Nav from "./Nav";
import Table from "./Table";
import { GRID_400503_COLS } from "../_const/400503";
import { Meta } from "../_const/meta";
import * as css from "./home.css";

interface B2cHomeProps {}

export default async function B2cHome({ session, page }: HomeProps<B2cHomeProps>) {
  const title = page.number + " " + page.title;

  const map: Record<string, Meta> = {
    "400503": { cols: GRID_400503_COLS },
  };

  const meta = map[page.number];

  if (!meta) {
    throw new Error("페이지 정보를 찾을 수 없습니다.");
  }

  return (
    <div className={css.wrap}>
      <div className={css.title}>{title}</div>
      <Nav session={session} />
      <Table meta={meta} session={session} />
    </div>
  );
}
