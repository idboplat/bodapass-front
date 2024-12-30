import { TClientPage } from "@/utils/getPage";
import { Session } from "next-auth";
import css from "./Home.module.scss";
import { Divider } from "@mantine/core";
import Nav from "./Nav";
import Table from "./Table";
import { TAdminlistDto } from "@/types/dto";

interface ClientProps {
  page: TClientPage;
  session: Session;
  dto: TAdminlistDto;
}

export default function Client({ page, session, dto }: ClientProps) {
  return (
    <section className="main">
      <div className={css.titleBox}>
        <h2>{page.title}</h2>
        <p>{page.description}</p>
      </div>

      <div className={css.contentBox}>
        <Nav dto={dto} />

        <Divider color="#fff" size={2} m="30px -45px" w="calc(100% + 90px)" />

        <div>
          <Table session={session} dto={dto} />
        </div>
      </div>
    </section>
  );
}
