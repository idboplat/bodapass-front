import styled, { css } from "styled-components";

export const Write_box = styled.div`
  ul {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -60px 30px;
    padding: 0 0 20px;
    border-bottom: 2px solid #fff;

    &:last-of-type {
      margin-bottom: 0;
      padding: 0;
      border: 0;
    }

    li {
      width: calc(50% - 120px);
      margin: 0 60px 17px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      strong {
        width: 130px;
        font-size: 16px;
        font-weight: 600;
        line-height: 1.4;
        color: #494949;
      }

      label {
        width: 130px;
        font-size: 16px;
        font-weight: 600;
        line-height: 1.4;
        color: #494949;
      }

      div {
        flex: 1;
        min-width: 0;
      }
    }

    .grid-1 {
      width: calc(100% - 120px);
    }
    .grid-3 {
      width: calc(33.33% - 120px);
    }
    .grid-4 {
      width: calc(25% - 60px);
      margin: 0 0 17px 60px;
    }

    .flex-vt {
      strong {
        padding-top: 15px;
      }
    }
  }
`;
