"use client";
import css from "./Home.module.scss";
import { TClientPage } from "@/utils/getPage";
import { Session } from "next-auth";
import { Divider } from "@mantine/core";
import Table from "./Table";
import Nav from "./Nav";
import { TUserListDto } from "@/types/dto";
import { DatePickerInput } from "@mantine/dates";

interface ClientProps {
  page: TClientPage;
  session: Session;
  dto: TUserListDto;
}

export default function Client({ page, session, dto }: ClientProps) {
  return (
    <section className="main">
      <div className={css.titleBox}>
        <h2>{page.title}</h2>
        <p>{"유저 목록 금월 내역은 XX-XX 00:00:00 ~ YY-YY 23:59:59 총 합을 표시합니다."}</p>
      </div>

      <DatePickerInput
        type="range"
        popoverProps={{ position: "bottom-start" }}
        numberOfColumns={2}
      />

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
