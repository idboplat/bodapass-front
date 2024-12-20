import styled, { css } from "styled-components";


export const HeaderWrap = styled.header`
  position:fixed; 
  left:0; 
  top:0; 
  width:240px; 
  height:100%; 
  background:#fff; 
  z-index:9999; 
  overflow-y:auto;
`;

export const Header_logo = styled.div`
  h1 {
    a {
      display:block; 
      padding:20px 38px 25px;

      img {
        width:127px;
      }
    }
  }
`;

export const Header_cate = styled.div`
  margin:10px 0 0;
`;

export const Header_cate_li = styled.li<{ active: boolean, childActive?: boolean, normalImg: string, activeImg: string }>`
  
  margin:0 0 11.8px;
  &:last-of-type {
    margin:0;
  }

  a {
    display:flex; 
    flex-wrap:wrap;
    align-items:center; 
    height:30px; 
    padding:0 33px; 
    font-size:14px; 
    color:rgba(0,0,0,0.5);

    &:before {
      display:inline-block; 
      content:""; 
      width:30.2px; 
      height:30.2px; 
      margin:0 12.27px 0 0; 
      background-size:cover; 
      background-position:center; 
      background-repeat:no-repeat;
    }
    &:before {
      background-image:url(${(props) => props.normalImg}); 
      background-size:15px auto;
    }
  }

  dl {
    display:none; 
    margin:11.8px 0 0; 
    background:#FAFAFA; 
    padding:18px 0 18px 49px;
  }

  ${({ active, activeImg}) => active && css`
    a {
      color:#000;

      &:before {
        background-image:url(${activeImg});
      }
    }
    dl {
      display:block;
    }
  `}
`;

export const Header_cate_dd = styled.dd<{ active: boolean }>`
  margin:0 0 17px;

  &:last-of-type {
    margin:0;
  }

  a {
    display:flex; 
    flex-wrap:wrap; 
    align-items:center; 
    font-size:14px; 
    color:rgba(0,0,0,0.5);

    &:before {
      display:inline-block; 
      content:""; 
      width:3px; 
      height:3px; 
      margin:0 26px 0 0; 
      border-radius:50%; 
      background:#808080;
    }

    ${({active}) => active && css`
      color:#000;
      &:before {
        background:#000;
      }
    `}
  }
`;