"use client";
import styled from "styled-components";
import * as styles from "../pageComponents/styled/contentboxStyled";
import { Input_box } from "../pageComponents/styled/inputboxStyled";
import { Write_box } from "../pageComponents/styled/writeboxStyled";
import { Calendar_box } from "../pageComponents/styled/calendarboxStyled";
import { Select_box } from "../pageComponents/styled/selectboxStyled";
import { Button_box } from "../pageComponents/styled/buttonboxStyled";
import { Line_box } from "../pageComponents/styled/lineboxStyled";
import { useState } from "react";
import { Select } from "@mantine/core";

import iconSelect from "@/assets/images/icon_select.png";
import { TClientPage } from "@/utils/getPage";
import { Session } from "next-auth";
import { TDeployDto } from "@/types/dto";
import css from "./Home.module.scss";
import Nav from "./Nav";
import Table from "./Table";

interface Props {
  page: TClientPage;
  session: Session;
  dto: TDeployDto;
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

        <Table session={session} dto={dto} />
      </div>
    </section>
  );
}
