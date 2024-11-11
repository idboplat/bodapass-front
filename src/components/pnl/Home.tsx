import Nav from "./Nav";
import Table from "./Table";
import css from "./Home.module.scss";
import { HomeProps } from "@/types/common";

interface CorpHomeProps {}

export default async function PnlHome({ page, session }: HomeProps<CorpHomeProps>) {
  const title = page.number + " " + page.title;
  return (
    <div className={css.wrap}>
      <div className={css.title}>{title}</div>
      <Nav session={session} />
      <Table session={session} />
    </div>
  );
}
