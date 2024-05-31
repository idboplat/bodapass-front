import { flexCenter } from "@/style/var";
import { style } from "@vanilla-extract/css";
import { global } from "@/style/globalTheme.css";

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

export const inputWrap = style({
  border: "none",
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

export const label = style({
  width: 60,
});

export const inputBox = style({
  border: "none",
  display: "flex",
  borderBottom: "1px solid #000",
});

export const input = style({
  border: "none",
  width: "100%",
  padding: 7,
  ":focus": {
    outline: "none",
  },
});

export const btnBox = style([
  flexCenter,
  {
    marginTop: 40,
  },
]);

export const loginBtn = style({
  width: "100%",
  height: 40,
  backgroundColor: global.blueDefault,
  padding: "7px 0",
  fontWeight: 600,
  fontSize: 16,
  color: "#fff",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
  borderRadius: 3,
  transition: "background-color 0.2s ease, color 0.2s ease",
  ":hover": {
    backgroundColor: global.blueHover,
  },
  ":disabled": {
    backgroundColor: global.blueDisabled,
  },
});
