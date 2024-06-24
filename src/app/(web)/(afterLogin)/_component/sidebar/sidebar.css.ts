import { flexCenter, zIndex } from "@/style/var";
import { globalStyle, style } from "@vanilla-extract/css";

export const layout = style({
  position: "relative",
  width: 0,
  flexShrink: 0,
  transition: "width 0.3s ease",
  selectors: {
    "&.show": {
      width: 200,
    },
  },
});

export const sidebar = style([
  zIndex.sidebar,
  {
    width: 200,
    position: "fixed",
    top: 42,
    height: "calc(100dvh - 42px)",
    background: "#f4f4f2",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 14,
    visibility: "hidden",
    opacity: 0,
    left: -200,
    transition: "visibility 0.3s ease, opacity 0.3s ease, left 0.3s ease",
    selectors: {
      "&.show": {
        visibility: "visible",
        opacity: 1,
        left: 0,
      },
    },
  },
]);

export const menuItem = style({
  borderRadius: 2,
  backgroundColor: "transparent",
  transition: "background-color 0.2s ease",
  color: "#242424",
  selectors: {
    "&:hover": {
      backgroundColor: "#ebebe7",
    },
    "&.active ": {
      fontWeight: 900,
      // backgroundColor: "#ebebe7",
    },
  },
});

globalStyle(`${menuItem} > a`, {
  display: "flex",
  alignItems: "center",
  padding: "6px 10px",
  gap: 6,
  fontWeight: 400,
});

globalStyle(`${menuItem}.active > a`, {
  fontWeight: 700,
  cursor: "default",
});

export const logoutBox = style([
  flexCenter,
  {
    fontSize: 16,
  },
]);

export const logoutBtn = style({
  color: "#9b9b9b",
  transition: "color 0.2s ease",
  selectors: {
    "&:hover": {
      color: "#242424",
    },
  },
});
