import { global } from "@/style/globalTheme.css";
import { style } from "@vanilla-extract/css";

export const defaultBtn = style([
  {
    backgroundColor: global.blueDefault,
    padding: "3px 7px",
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

export const navBtn = style([
  {
    minWidth: 80,
    backgroundColor: "#759cff",
    padding: "3px 7px",
    borderRadius: 3,
    boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
    transition: "background-color 0.2s ease, color 0.2s ease",
    color: "#fff",
    alignSelf: "center",
    ":hover": {
      backgroundColor: "#5C83E6",
    },
    ":disabled": {
      background: "#d9e3f4",
    },
  },
]);

export const dateBtn = style({
  minWidth: 70,
  backgroundColor: "#EFEFEF",
  padding: "3px 7px",
  borderRadius: 3,
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  transition: "background-color 0.2s ease",
  ":hover": {
    backgroundColor: "#D6D6D6 ",
  },
});
