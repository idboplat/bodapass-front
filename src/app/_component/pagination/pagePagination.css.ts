import { globalStyle, style } from "@vanilla-extract/css";
import { flexCenter } from "@/style/var";
import { global } from "@/style/globalTheme.css";

export const wrap = style({
  padding: "10px 0",
  display: "flex",
  justifyContent: "center",
  gap: 5,
});

globalStyle(`${wrap} > ol`, {
  display: "flex",
  gap: 5,
});

globalStyle(`${wrap} > ol >li`, {
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#303038",
});

globalStyle(`${wrap} > ol >li > button`, {
  minWidth: 30,
  height: 28,
});

globalStyle(`${wrap} > ol > li> button.active`, {
  border: `1px solid ${global.blueActive}`,
  borderRadius: 5,
  color: global.blueActive,
  cursor: "default",
});

globalStyle(`${wrap} > button > svg`, {
  color: "#bfbfbf",
});

globalStyle(`${wrap} > button > svg:hover`, {
  color: "#929294",
});

globalStyle(`${wrap} >  button:disabled > svg`, {
  color: "#e0e0e0 ",
  cursor: "default",
});
