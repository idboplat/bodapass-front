"use client";
import { TClientPage } from "@/utils/getPage";
import { Session } from "next-auth";
import { TB2bDto } from "@/types/dto";
import css from "./Home.module.scss";
import { Button, Divider } from "@mantine/core";
import Nav from "./Nav";
import Table from "./Table";

interface Props {
  page: TClientPage;
  session: Session;
  dto: TB2bDto;
}

export default function Client({ page, session, dto }: Props) {
  return (
    <section className="main">
      <div className={css.titleBox}>
        <h2>{page.title}</h2>
        <p>{page.description}</p>
      </div>

      <div className={css.contentBox}>
        <Nav dto={dto} />

        <Divider color="#fff" size={2} m="30px -45px" w="calc(100% + 90px)" />

        <Table dto={dto} session={session} />
      </div>
    </section>
  );
}
