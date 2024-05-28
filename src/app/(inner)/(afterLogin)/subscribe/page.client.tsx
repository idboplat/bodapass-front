"use client";
import styled from "@emotion/styled";
import Details from "./_component/Details/Details";
import ChartType from "./_component/ChartType/ChartType";
import { Session } from "next-auth";

const Wrap = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  column-gap: 10px;
`;

interface HomeProps {
  session: Session;
}

export default function Home({ session }: HomeProps) {
  return (
    <Wrap>
      <Details session={session} />
      <ChartType session={session} />
    </Wrap>
  );
}
