import Nav from "./Nav";
import Table from "./Table";
import css from "./Home.module.scss";
import { HomeProps } from "@/types/common";

interface TradeHistoryHomeProps {}

export default async function TradeHistoryHome({
  page,
  session,
}: HomeProps<TradeHistoryHomeProps>) {
  const title = page.number + " " + page.title;
  return (
    <div className={css.wrap}>
      <div className={css.title}>{title}</div>
      <Nav session={session} />
      <Table session={session} />
    </div>
  );
}
