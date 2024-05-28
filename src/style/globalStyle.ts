import { css } from "@emotion/react";

export default function globalStyle() {
  return css`
    * {
      margin: 0;
      padding: 0;
      border: none;
      color: inherit;
      font-size: inherit;
      font-family: inherit;
      box-sizing: border-box;
    }

    ::-webkit-scrollbar {
      width: 7.5px;
      height: 7.5px;
    }

    ::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0.1);
    }

    ::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      cursor: pointer;
    }

    ::-webkit-scrollbar-button {
      display: none;
      visibility: hidden;
    }

    html,
    body {
      font-size: 14px; //root font size
      min-width: 1280px;
      min-height: 720px;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    label {
    }

    input {
      &::placeholder {
        font-family: inherit;
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        //자동완성 스타일 제거, 흰 그림자로 스타일을 가린다.
        -webkit-text-fill-color: #000000;
        -webkit-box-shadow: 0 0 0 1000px #ffffff inset;
        box-shadow: 0 0 0 1000px #ffffff inset;
      }
    }

    textarea {
      background: none;
      border: none;
      font-family: inherit;
      margin: 0;
      padding: 0;
      resize: none;
    }

    ul,
    ol {
      list-style: none;
    }

    hr {
      border-bottom: 1px solid #000000;
    }

    button {
      cursor: pointer;
      background: none;

      > svg {
        display: block; //svg를 버튼 가온데 위치에 정렬하기위해 사용
      }
    }

    .essential {
      &::before {
        content: "*";
        color: red;
      }
    }
  `;
}
