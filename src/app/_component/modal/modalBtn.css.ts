import { global } from "@/style/globalTheme.css";
import { style } from "@vanilla-extract/css";

export const modalDefaultBtn = style([
  {
    backgroundColor: global.blueDefault,
    width: 100,
    padding: "7px 0",
    borderRadius: 3,
    boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
    transition: "background-color 0.2s ease, color 0.2s ease",
    color: "#fff",
    ":hover": {
      backgroundColor: global.blueHover,
    },
    ":disabled": {
      background: "#B0B0B0",
      cursor: "default",
    },
  },
]);

/** 회색버튼 */
export const modalCancelBtn = style([
  modalDefaultBtn,
  {
    backgroundColor: global.grayDefault,
    ":hover": {
      backgroundColor: global.grayHover,
    },
    ":disabled": {
      background: global.grayDisabled,
    },
  },
]);

/** 빨강버튼 */
export const modalDenyBtn = style([
  modalDefaultBtn,
  {
    backgroundColor: "#e5383b",
    ":hover": {
      backgroundColor: "#ED4043",
    },
    ":disabled": {
      background: "#B0B0B0",
    },
  },
]);

/** 녹색버튼 */
export const modalSaveBtn = style([
  modalDefaultBtn,
  {
    backgroundColor: "#028a0f",
    ":hover": {
      backgroundColor: "#0F971C",
    },
    ":disabled": {
      background: "#B0B0B0",
    },
  },
]);
