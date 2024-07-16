import { flexCenter } from "@/style/var";
import { globalStyle, style } from "@vanilla-extract/css";

export const textBox = style([
  {
    display: "flex",
    justifyContent: "space-between",
  },
]);

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
  fontSize: 12,
  display: "flex",
  // justifyContent: "space-between",
});
