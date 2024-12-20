import styled, { css } from "styled-components";
import iconSearch from "../../../assets/images/icon_search.png"
import iconPlus from "../../../assets/images/icon_plus.png"
import iconLink from "../../../assets/images/icon_link.png"


export const Input_box = styled.div<{ flex1?: boolean }>`
  background:#fff; 
  border-radius:15px; 
  overflow:hidden; 
  display:flex; 
  flex-wrap:wrap; 
  align-items:center; 
  justify-content:center;

  ${({flex1}) => flex1 && css`
    flex:1 !important; 
    -webkit-flex:1; 
    min-width:0;
  `}

  input {
    height:47px; 
    font-size:16px; 
    color:#494949; 
    flex:1; 
    min-width:0; 
    padding:0 20px;
  }

  em {
    padding-right:20px; 
    font-size:16px; 
    color:#494949;
  }

  a {
    display:flex; 
    flex-wrap:wrap; 
    align-items:center; 
    justify-content:center; 
    margin:0 14px 0 0; 
    width:70px; 
    height:23px; 
    border-radius:5px; 
    color:#fff; 
    background:#667DFF; 
    font-size:12px;
  }
  .search {
    width:25px; 
    height:25px; 
    font-size:0; 
    border-radius:0; 
    background:url(${iconSearch.src}) no-repeat center / cover;
  }

  .plus {
    width:11px; 
    height:11px; 
    font-size:0; 
    border-radius:0; 
    background:url(${iconPlus.src}) no-repeat center / cover;
  }

  .link {
    width:15px; 
    height:15px; 
    font-size:0; 
    border-radius:0; 
    background:url(${iconLink.src}) no-repeat center / cover;
  }
`;