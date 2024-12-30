import { Divider } from "@mantine/core";
import { TClientPage } from "@/utils/getPage";
import { Session } from "next-auth";
import { TOrderStatusDto } from "@/types/dto";
import Table from "./Table";
import Nav from "./Nav";
import css from "./Home.module.scss";

interface OrderStatusProps {
  page: TClientPage;
  session: Session;
  dto: TOrderStatusDto;
}

export default function Client({ page, session, dto }: OrderStatusProps) {
  return (
    <section className="main">
      <div className={css.titleBox}>
        <h2>{page.title}</h2>
        <p>{page.description}</p>
      </div>

      <div className={css.contentBox}>
        <Nav dto={dto} />

        <Table dto={dto} session={session} />
      </div>
    </section>
  );
}
