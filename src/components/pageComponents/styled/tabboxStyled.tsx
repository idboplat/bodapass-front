import styled, { css } from "styled-components";

export const Tab_box = styled.div`
  ul {
    display:flex; 
    flex-wrap:wrap;

    li {
      flex:1; 
      min-width:0; 
      margin-right:34px;

      &:last-of-type { margin:0; }

      a {
        display:flex; 
        flex-wrap:wrap; 
        align-items:center; 
        justify-content:center; 
        background:#fff; 
        border-radius:15px; 
        border:2px solid #8e8e8e; 
        font-size:16px; 
        color:#8e8e8e; 
        height:47px;
      }

      

      .input-box {
        border:2px solid #8e8e8e;

        input { height:43px; }
      }
    }

    .active {
      a {
        border-color:#667DFF; 
        color:#667DFF;
      }
    }
  }
`;
