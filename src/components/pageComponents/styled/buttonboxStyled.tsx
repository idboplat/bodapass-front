import styled, { css } from "styled-components";


export const Button_box = styled.div<{ mt?: string, sm?: boolean }>`
  display:flex; 
  flex-wrap:wrap; 
  align-items:center; 
  justify-content:center;

  ${({mt}) => mt && css`
    margin-top:${mt}px !important;
  `}

  a {
    display:flex; 
    flex-wrap:wrap; 
    align-items:center; 
    justify-content:center; 
    flex:1; 
    min-width:0; 
    height:29px; 
    border-radius:10px; 
    font-size:16px;

    ${({sm}) => sm && css`
      height:21px; 
      padding:0 4px; 
      font-size:12px; 
      border-radius:6px; 
      flex:none;
    `}
  }

    .btn-active {
      color:#fff; 
      background:#667DFF;
    }

    .btn-bd-active {
      background:#fff; 
      border:1px solid #667DFF; 
      color:#667DFF;
    }

    .btn-bd-black {
      border:1px solid #000; 
      color:#000;
    }
  
`;