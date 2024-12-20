import styled, { css } from "styled-components";
import iconPrev from "../../../assets/images/icon_date_prev.png"
import iconNext from "../../../assets/images/icon_date_next.png"

export const Date_box = styled.div<{ mt?: string}>`
  display:flex; 
  flex-wrap:wrap; 
  align-items:center; 
  justify-content:center;

  ${({mt}) => mt && css`
    margin-top:${mt}px !important;
  `}

  a {
    display:block; 
    font-size:0;
    width:21px; 
    height:21px; 
    background-size:cover; 
    background-position:center;
  }

  .prev {
    background-image:url(${iconPrev.src});
  }
  .next {
    background-image:url(${iconNext.src});
  }

  strong {
    margin:0 17px; 
    font-size:18px; 
    font-weight:bold; 
    color:#3d3d3d;
  }
`;