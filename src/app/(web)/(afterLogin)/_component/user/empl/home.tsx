import { HomeProps } from "@/type/common";
import Nav from "./_component/Nav";
import Table from "./_component/Table";
import * as css from "./home.css";

interface EmplHomeProps {}

export default async function EmplHome({ page, session }: HomeProps<EmplHomeProps>) {
  const title = page.number + " " + page.title;
  return (
    <div className={css.wrap}>
      <div className={css.title}>{title}</div>
      <Nav session={session} />
      <Table session={session} />
    </div>
  );
}
