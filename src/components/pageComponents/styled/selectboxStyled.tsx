import styled, { css } from "styled-components";
import iconSelect from "../../../assets/images/icon_select.png"


export const Select_box = styled.div<{ openType: boolean }>`
  position:relative;

  ${({openType}) => openType && css`
    z-index:20;
  `}

  button {
    width:100%;
    display:flex; 
    flex-wrap:wrap; 
    align-items:center; 
    overflow:hidden; 
    border-radius:15px; 
    background:#fff;

    p {
      flex:1; 
      min-width:0; 
      overflow:hidden; 
      white-space:nowrap; 
      text-overflow:ellipsis; 
      font-size:16px; 
      color:#494949; 
      height:47px; 
      line-height:47px; 
      padding:0 20px;
    }

    &:after {
      display:inline-block; 
      content:""; 
      width:14px; 
      height:12px; 
      margin:0 20px 0 0; 
      background:url(${iconSelect.src}) no-repeat center / cover;
    }
  }

  div {
    transition:all ease 0.5s; 
    pointer-events:none; 
    opacity:0; 
    position:absolute; 
    left:0; 
    top:47px; 
    width:100%; 
    background:#fff; 
    border-radius:15px; 
    border:1px solid #588CBF; 
    max-height:470px; 
    overflow-y:auto;

    &::-webkit-scrollbar { display:none; }

    ${({openType}) => openType && css`
      pointer-events:inherit; 
      opacity:1; 
      top:62px;
    `}

    dl {
      dd {
        a {
          display:flex; 
          flex-wrap:wrap; 
          align-items:center; 
          justify-content:center; 
          padding:0 14px;

          p {
            font-size:16px; 
            overflow:hidden; 
            white-space:nowrap; 
            text-overflow:ellipsis; 
            flex:1; 
            min-width:0; 
            text-align:center; 
            border-bottom:1px solid #bdbdbd; 
            padding:14px 0;
          }

          &:hover { background:#D7DEFF; }
        }


        &:last-of-type {
          a {
            p {
              border:0;
            }
          }
        }
      }

      .active {
        a { background:#D7DEFF; }
      }
    }
  }


`;