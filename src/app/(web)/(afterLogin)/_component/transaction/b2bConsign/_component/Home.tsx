import { HomeProps } from "@/type/common";
import * as css from "./home.css";
import Nav from "./Nav";
import Table from "./Table";

interface B2bConsignHomeProps {}

export default async function B2bConsignHome({ session, page }: HomeProps<B2bConsignHomeProps>) {
  const title = page.number + " " + page.title;

  if (!page.number) {
    throw new Error("페이지 정보를 찾을 수 없습니다.");
  }

  return (
    <div className={css.wrap}>
      <div className={css.title}>{title}</div>
      <Nav session={session} />
      <Table session={session} />
    </div>
  );
}
