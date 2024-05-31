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
      background: global.blueDisabled,
    },
  },
]);

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
