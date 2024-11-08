import { HomeProps } from "@/type/common";
import css from "./Home.module.scss";
import Nav from "./_component/Nav";
import Table from "./_component/Table";

interface ClientHomeProps {}

export default function ClientHome({ page, session }: HomeProps<ClientHomeProps>) {
  const title = page.number + " " + page.title;

  return (
    <div className={css.wrap}>
      <div className={css.title}>{title}</div>
      <Nav session={session} />
      <Table session={session} />
    </div>
  );
}
