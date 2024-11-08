import Nav from "./_component/Nav";
import Table from "./_component/Table";
import css from "./Home.module.scss";
import { HomeProps } from "@/type/common";

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
