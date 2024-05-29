import Nav from "./Nav";
import Table from "./Table";
import styled from "@emotion/styled";
import { Session } from "next-auth";

export const Wrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

interface ChartTypeProps {
  session: Session;
}

export default function ChartType({ session }: ChartTypeProps) {
  return (
    <Wrap>
      <Nav session={session} />
      <Table session={session} />
    </Wrap>
  );
}
