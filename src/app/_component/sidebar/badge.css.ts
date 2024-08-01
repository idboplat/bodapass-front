import { style } from "@vanilla-extract/css";

export const badge = style({
  borderRadius: 9999,
  width: 4,
  height: 4,
  backgroundColor: "#ee6b6e",
  position: "absolute",
  right: 0,
  top: 0,
  transform: "translate(100%, 25%)",
});
