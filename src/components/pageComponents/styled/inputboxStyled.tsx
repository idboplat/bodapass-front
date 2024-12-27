import styled, { css } from "styled-components";
import iconSearch from "../../../assets/images/icon_search.png";
import iconPlus from "../../../assets/images/icon_plus.png";
import iconLink from "../../../assets/images/icon_link.png";

export const Input_box = styled.div<{ flex1?: boolean }>`
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  ${({ flex1 }) =>
    flex1 &&
    css`
      flex: 1 !important;
      -webkit-flex: 1;
      min-width: 0;
    `}

  input {
    height: 47px;
    font-size: 16px;
    color: #494949;
    flex: 1;
    min-width: 0;
    padding: 0 20px;
  }

  em {
    padding-right: 20px;
    font-size: 16px;
    color: #494949;
  }

  a {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin: 0 14px 0 0;
    width: 70px;
    height: 23px;
    border-radius: 5px;
    color: #fff;
    background: #667dff;
    font-size: 12px;
  }
`;
