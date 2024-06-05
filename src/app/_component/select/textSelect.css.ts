import { style } from "@vanilla-extract/css";
import { openMenu } from "@/style/keyframe.css";

export const wrap = style([
  {
    border: "1.25px solid #bfbfbf",
    padding: 5,
    borderRadius: 3,
    position: "relative",
  },
]);

export const selected = style([
  {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
]);

export const absolute = style([
  {
    width: "calc(100% + 2.5px)", // 양쪽 border 두께만큼 더함
    position: "absolute",
    animation: `${openMenu} 0.2s ease-out`,
    left: -1.25,
    zIndex: 3,
    paddingTop: 5,
    top: "100%",
    display: "none",
    selectors: {
      "&.show": {
        display: "block",
      },
    },
  },
]);

export const list = style([
  {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    border: "1.25px solid #bfbfbf",
    borderRadius: 3,
  },
]);

export const item = style([
  {
    height: 28,
    padding: 3,
    transition: "background-color 0.2s ease",
    cursor: "pointer",
    selectors: {
      "&:hover": {
        backgroundColor: "#f0f0f0",
      },
    },
  },
]);
