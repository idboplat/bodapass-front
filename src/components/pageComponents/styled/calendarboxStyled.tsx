import styled, { css } from "styled-components";
import iconArrow from "../../../assets/images/icon_arrow.png"
import iconClose from "../../../assets/images/icon_close.png"
import iconCalPrev from "../../../assets/images/icon_calendar_prev.png"
import iconCalNext from "../../../assets/images/icon_calendar_next.png"

/**
 * 달력 팝.
 * 첫 달력 - 둘째 달력 스타일 수정 필요.
 */
export const Calendar_box = styled.div<{ openPop: boolean }>`
  position:relative;

  ${({openPop}) => openPop && css`
    z-index:10;
  `}

  .cal-button {
    display:flex; 
    flex-wrap:wrap; 
    align-items:center; 
    background:#fff; 
    border-radius:15px; 
    padding:0 14px;

      .select {
        flex:1; 
        min-width:0; 
        height:47px; 
        display:flex; 
        flex-wrap:wrap; 
        align-items:center; 
        justify-content:center;

        time {
          font-size:16px; 
          color:#494949;
        }

        em {
          margin:0 28px; 
          font-size:16px; 
          color:#494949;
        }
      }

      .yesterday {
        display:flex; 
        flex-wrap:wrap; 
        align-items:center; 
        justify-content:center; 
        width:76px; 
        height:29px; 
        border-radius:10px; 
        font-size:16px;
        background:#667DFF; 
        color:#fff;
        margin:0 12px 0 0;
      }

      .today {
        display:flex; 
        flex-wrap:wrap; 
        align-items:center; 
        justify-content:center; 
        width:76px; 
        height:29px; 
        border-radius:10px; 
        font-size:16px;
        color:#667DFF; 
        border:1px solid #667DFF;
      }

  }


  .cal-popup {
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
    padding:8px 16px;

    ${({openPop}) => openPop && css`
      pointer-events:inherit; 
      opacity:1; 
      top:62px;
    `}

    .popup-head {
      border-bottom:1px solid #BDBDBD; 
      padding:16px 16px 16px 32px; 
      margin:0 0 16px; 
      display:flex; 
      flex-wrap:wrap; 
      align-items:center; 
      justify-content:space-between;

      h2 {
        display:flex; 
        flex-wrap:wrap; 
        align-items:center;

        time {
          display:flex; 
          flex-wrap:wrap; 
          align-items:center; 
          font-size:20px; 
          font-weight:600; 
          color:#BDBDBD;

          &:after {
            display:inline-block; 
            content:""; 
            width:24px; 
            height:24px; 
            margin:0 10px; 
            background:url(${iconArrow.src}) no-repeat center / cover;
          }

          &:last-of-type:after { display:none; }
        }
      }

      .close {
        width:14px; 
        height:14px; 
        font-size:0; 
        background:url(${iconClose.src}) no-repeat center / cover;
      }
    }

    .popup-body {
      padding:0 32px 15px;
    }
  }
    

  .cal-head {
    display:flex; 
    flex-wrap:wrap; 
    align-items:center; 
    position:relative; 
    margin:0 0 16px;

    a {
      display:block; 
      font-size:0; 
      width:24px; 
      height:24px; 
      background-size:cover; 
      background-position:center; 
      position:absolute; 
      top:50%; 
      transform:translateY(-50%);

      
    }

    .prev {
      background-image:url(${iconCalPrev.src}); 
      left:0;
    }

    .next {
      background-image:url(${iconCalNext.src}); 
      right:0;
    }

    .date {
      padding:16px 0; 
      font-size:20px; 
      font-weight:600; 
      color:#828282; 
      border-bottom:1px solid #BDBDBD; 
      display:flex; 
      flex-wrap:wrap; 
      align-items:center; 
      justify-content:center;
    }

    div {
      flex:1; 
      min-width:0; 
      margin-right:72px;

      .cal-head-end { margin-right:0; }
    }
  }

  .cal-body {
    display:flex; 
    flex-wrap:wrap;

    table > {
      flex:1; 
      min-width:0; 
      margin-right:16px;

      .cal-list-end { margin-right:0; }
    }

    table {
      table-layout:fixed;

      thead {
        tr {
          th {
            height:39px; 
            font-size:14px; 
            font-weight:700;
          }

          td {
            .sun {
              .date {
                color:#C2281D;
              }
            }

            p {
              .date {
                background:#F2F2F2; 
                color:#919199;
              }
            }

            .date {
              height:39px; 
              font-weight:500; 
              display:flex; 
              flex-wrap:wrap; 
              align-items:center; 
              justify-content:center; 
              align-content:center;

              .start {
                background:#667DFF; 
                border-radius:4px 0 0 4px; 
                color:#000; 
                align-content:center; 
                align-items:center;
              }

              .end {
                background:#667DFF; 
                border-radius:0 4px 4px 0; 
                color:#000; 
                align-content:center; 
                align-items:center;
              }

              .oneday { border-radius:4px; }
            }

            .ing { background:rgba(95, 122, 255, 0.25); }
          }
        }
      }
    }
  }

`;