"use client";
import styled from "@emotion/styled";
import Nav from "./_component/Nav";
import Table from "./_component/Table";
import { Session } from "next-auth";

const Wrap = styled.div`
  width: 100%;
  padding: 10px;
`;

interface HomeProps {
  session: Session;
}

export default function Home({ session }: HomeProps) {
  return (
    <Wrap>
      <Nav session={session} />
      <Table session={session} />
    </Wrap>
  );
}
