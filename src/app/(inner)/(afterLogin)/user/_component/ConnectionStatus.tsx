import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ICellRendererParams } from "ag-grid-community";

const Circle = styled.div<{ status: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background: #808080;
  align-self: center;
  ${({ status }) =>
    status &&
    css`
      background: #62c1e5;
    `};
`;

export default function ConnectionStatus(props: ICellRendererParams) {
  return <Circle status={props.data["접속 여부"] === "Y"}></Circle>;
}
