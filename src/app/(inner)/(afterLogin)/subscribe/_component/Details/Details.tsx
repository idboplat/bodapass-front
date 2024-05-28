import styled from "@emotion/styled";
import Nav from "./Nav";
import Table from "./Table";
import { Session } from "next-auth";

export const Wrap = styled.div`
  flex: 1.8;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

interface DetailsProps {
  session: Session;
}

export default function Details({ session }: DetailsProps) {
  return (
    <Wrap>
      <Nav session={session} />
      <Table session={session} />
    </Wrap>
  );
}
