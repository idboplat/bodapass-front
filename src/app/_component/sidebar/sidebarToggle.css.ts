import { globalStyle, style } from "@vanilla-extract/css";

export const btn = style({
  width: 32,
  height: 32,
  transition: "background-color 0.2s ease",
  borderRadius: 9999,
  ":hover": {
    background: "#e2e2e2",
  },
});

globalStyle(`${btn}:hover + .hover`, {
  opacity: 1,
  visibility: "visible",
});

export const icon = style({
  margin: "0 auto",
});

export const hoverBox = style({
  position: "absolute",
  top: 40,
  opacity: 0,
  visibility: "hidden",
  transition: "opacity 0.2s ease, visibility 0.2s ease",
  padding: "6px 10px",
  background: "#3d3d3d",
  borderRadius: 4,
});

globalStyle(`${hoverBox} > p`, {
  color: "#eeeeee",
});

globalStyle(`${hoverBox} > span`, {
  color: "#a8a8a8",
});
