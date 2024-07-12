import { globalStyle, style } from "@vanilla-extract/css";

export const textBox = style([{}]);

globalStyle(`${textBox} > p`, {
  display: "inline",
  verticalAlign: "middle",
});

globalStyle(`${textBox} > button`, {
  marginLeft: 10,
  verticalAlign: "middle",
});

export const descBox = style({
  marginBlock: 20,
  // textAlign: "center",
});
