import { HomeProps } from "@/types/common";
import Nav from "./Nav";
import Table from "./Table";
import css from "./Home.module.scss";

interface DeployHomeProps {}

export default async function DeployHome({ session, page }: HomeProps<DeployHomeProps>) {
  const title = page.number + " " + page.title;
  return (
    <div className={css.wrap}>
      <div className={css.title}>{title}</div>
      <Nav session={session} />
      <Table session={session} />
    </div>
  );
}
