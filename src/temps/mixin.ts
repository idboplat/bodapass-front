import { css } from "@emotion/react";

export const textLine = (lineHeight: string, clamp: number) => {
  if (!/px/.test(lineHeight)) throw new Error("lineHeight는 px단위만 사용가능합니다.");
  return css`
    word-break: break-all;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${clamp};
    line-height: ${lineHeight};
    height: calc(${lineHeight} * ${clamp});
  `;
};

export const absoluteCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
