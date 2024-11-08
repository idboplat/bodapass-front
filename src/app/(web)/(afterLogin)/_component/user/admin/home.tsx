import { HomeProps } from "@/type/common";
import Nav from "./_component/Nav";
import Table from "./_component/Table";
import css from "./Home.module.scss";

interface AdminHomeProps {}

export default async function AdminHome({ page, session }: HomeProps<AdminHomeProps>) {
  const title = page.number + " " + page.title;
  return (
    <div className={css.wrap}>
      <div className={css.title}>{title}</div>
      <Nav session={session} />
      <Table session={session} />
    </div>
  );
}
