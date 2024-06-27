import { HomeProps } from "@/type/common";
import Nav from "./_component/Nav";
import Table from "./_component/Table";
import * as css from "./home.css";

type TransactionHomeProps = {};

export default async function TransactionHome({ session, page }: HomeProps<TransactionHomeProps>) {
  const title = page.number + " " + page.title;
  return (
    <div className={css.wrap}>
      <div className={css.title}>{title}</div>
      <Nav />
      <Table session={session} />
    </div>
  );
}
