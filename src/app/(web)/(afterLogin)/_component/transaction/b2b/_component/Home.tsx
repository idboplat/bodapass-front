import { HomeProps } from "@/type/common";
import module from "./Home.module.scss";
import Nav from "./Nav";
import Table from "./Table";

interface B2bHomeProps {}

export default async function B2bHome({ session, page }: HomeProps<B2bHomeProps>) {
  const title = page.number + " " + page.title;

  if (!page.number) {
    throw new Error("페이지 정보를 찾을 수 없습니다.");
  }

  return (
    <div className={module.wrap}>
      <div className={module.title}>{title}</div>
      <Nav session={session} />
      <Table session={session} />
    </div>
  );
}
