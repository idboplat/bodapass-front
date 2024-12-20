import styled, { css } from "styled-components";
import iconState01 from "../../../assets/images/icon_state_01.png"
import iconState02 from "../../../assets/images/icon_state_02.png"
import iconState03 from "../../../assets/images/icon_state_03.png"
import iconState04 from "../../../assets/images/icon_state_04.png"
import iconOrder from "../../../assets/images/icon_order.png"

export const Section = styled.section`
  width:calc(100% - 240px); 
  margin-left:240px; 
  padding:25px 44px 67px 23px;
`;

export const TitleBox = styled.div`
  margin:0 0 20px;

  h2 {
    font-size:18px;
  }
  p {
    margin:8px 0 0; 
    font-size:14px; 
    line-height:1.3; 
    color:#8e8e8e;
  }
`;

export const Content_box = styled.div`
  background:#F8F9FE; 
  border-radius:20px; 
  padding:45px;
`;

export const State_box = styled.div`
  ul {
    display:flex; 
    flex-wrap:wrap;

    li {
      flex:1; 
      min-width:0; 
      margin-right:30px; 
      border-radius:15px; 
      background:#fff;

      &:last-of-type {
        margin:0;
      }

      a {
        display:flex; 
        flex-wrap:wrap; 
        align-items:center; 
        padding:17px 17px 45px 24px;

        &:after {
          display:inline-block; 
          content:""; 
          width:45.3px; 
          height:45.3px; 
          background-size:cover; 
          background-position:center;
        }

        div {
          flex:1; 
          min-width:0; 
          padding-right:17px;

          p {
            margin:0 0 5px; 
            font-size:14px; 
            color:#8898AA;
          }

          strong {
            font-size:20px; 
            color:#494949;
          }
        }
      }

      &:nth-of-type(1) {
        a {
          &:after {
            background-image:url(${iconState01.src});
          }
        }
      }

      &:nth-of-type(2) {
        a {
          &:after {
            background-image:url(${iconState02.src});
          }
        }
      }

      &:nth-of-type(3) {
        a {
          &:after {
            background-image:url(${iconState03.src});
          }
        }
      }

      &:nth-of-type(4) {
        a {
          &:after {
            background-image:url(${iconState04.src});
          }
        }
      }


    }
  }
`;

export const Table_box = styled.div<{mt?: string, mr?: string, flex1?: boolean, noWhite?: boolean}>`
  background:#fff; 
  border-radius:15px;

  ${({mt}) => mt && css`
    margin-top:${mt}px !important;
  `}

  ${({mr}) => mr && css`
    margin-right:${mr} !important;
  `}

  ${({flex1}) => flex1 && css`
    flex:1 !important; 
    -webkit-flex:1; 
    min-width:0;
  `}

  ${({noWhite}) => noWhite && css`
    background:none; 
    border-radius:0;
  `}
`;

export const Table_head = styled(Table_box)<{noWhite?: boolean}>`
  padding:16px 24px; 
  display:flex; 
  flex-wrap:wrap; 
  align-items:center; 
  justify-content:space-between;

  ${({noWhite}) => noWhite && css`
    padding:0;
  `}

  h2 {
    font-size:14px; 
    color:#494949;
  }

  p {
    font-size:12px; 
    color:#8898AA;
  }

  a {
    display:flex; 
    flex-wrap:wrap; 
    align-items:center; 
    justify-content:center; 
    height:23px; 
    border-radius:5px; 
    padding:0 8px; 
    font-size:12px; 
    color:#fff; 
    background:#667DFF;
  }
`;

export const Table_body = styled(Table_box)`
  overflow-x:auto; 
  white-space:nowrap;

  table {
    thead {
      tr {
        th {
          background:#fafafa; 
          height:38px; 
          font-size:12px; 
          color:#8898AA; 
          padding:0 16.5px;

          &:first-of-type { padding-left:33px; }

          &:last-of-type { padding-right:33px; }

          a {
            display:flex; 
            flex-wrap:wrap; 
            align-items:center; 
            justify-content:center; 
            font-size:12px; 
            color:#8898aa;

            &:after {
              width:7px; 
              height:11.5px; 
              display:inline-block; 
              content:""; 
              margin:0 0 0 10px; 
              background:url(${iconOrder.src}) no-repeat center / cover;
            }

            &.active {
              &:after { transform:rotate(180deg); }
            }
          }
        }

        
      }
    }

    tbody {
      tr {
        td {
          border-bottom:2px solid #FAFAFA; 
          padding:10px 16.5px; 
          font-size:12px; 
          color:#8898AA; 
          font-weight:300;

          &:first-of-type { padding-left:33px; }
          &:last-of-type { padding-right:33px; }

          em {
            font-size:12px; 
            color:#007C75;
          }

          a {
            font-size:12px; 
            color:#000;
          }

          &.table-image {
            display:flex; 
            flex-wrap:wrap; 
            align-items:center;

            img {
              width:23px; 
              height:23px; 
              object-fit:cover;
            }

            p {
              padding-left:15px; 
              font-size:12px; 
              color:#8898aa;
            }
          }
        }

        &:last-of-typr {
          td { border:0; }
        }
      }
    }
  }

`;