import { HomeProps } from "@/type/common";
import Nav from "./_component/Nav";
import Table from "./_component/Table";
import * as css from "./home.css";
import { ColDef } from "ag-grid-community";
import { GRID_100502_COLS } from "./_const/100502";
import { GRID_100503_COLS } from "./_const/100503";

interface TransactionHomeProps {}

export default async function TransactionHome({ session, page }: HomeProps<TransactionHomeProps>) {
  const title = page.number + " " + page.title;

  const colMap: Record<string, ColDef[]> = {
    "100502": GRID_100502_COLS,
    "100503": GRID_100503_COLS,
  };

  const cols = colMap[page.number];

  return (
    <div className={css.wrap}>
      <div className={css.title}>{title}</div>
      <Nav />
      <Table cols={cols} session={session} />
    </div>
  );
}
