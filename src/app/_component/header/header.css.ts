import { zIndex } from "@/style/var";
import { globalStyle, style } from "@vanilla-extract/css";

export const wrap = style([{ width: "100%", height: 42 }]);

export const fixed = style([
  zIndex.header,
  {
    height: 42,
    position: "fixed",
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "0 10px",
    backgroundColor: "#fff",
    boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px",
    justifyContent: "space-between",
  },
]);

globalStyle(`${fixed} > div`, {
  display: "flex",
  alignItems: "center",
  gap: 7,
});

export const title = style({
  fontSize: 16,
  fontWeight: 400,
});
