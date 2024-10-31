import { vars } from "@/style/var";
import { globalStyle, style } from "@vanilla-extract/css";

export const menuList = style({
  overflowY: "auto",
  flex: 1,
  "::-webkit-scrollbar": {
    width: 5,
  },
  "::-webkit-scrollbar-track": {
    background: "none",
  },
});

// export const menuItem = style({
//   paddingLeft: 10,
//   borderRadius: 2,
//   transition: "color 0.2s ease",
//   color: "#5E5E5E",

//   selectors: {
//     "&:hover": {
//       color: "#1C1C1C",
//     },
//     "&.active ": {
//       fontWeight: 500,
//       color: "#1C1C1C",
//     },
//   },
// });

// globalStyle(`${menuItem} > a`, {
//   display: "flex",
//   alignItems: "center",
//   padding: "6px 10px",
//   gap: 6,
// });

// globalStyle(`${menuItem}.active > a`, {
//   cursor: "default",
// });

// globalStyle(`${menuItem} > a > span`, {
//   position: "relative",
// });

export const category = style({
  color: "orange",
  fontWeight: 500,
  transition: "color 0.2s ease, background-color 0.2s ease",
  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.gray[2],
    },
    "&[data-active='true']": {
      // color: "red",
      backgroundColor: "unset",
    },
  },
});

export const link = style({
  color: "red",
  selectors: {
    "&::after": {
      display: "block",
      content: "",
      borderBottom: `2px solid ${vars.colors.blue[8]}`,
      transform: "scaleX(0)",
      transformOrigin: "0% 50%",
      transition: "transform 0.2s ease-in-out",
    },
    "&:hover::after": {
      transform: "scaleX(1)",
    },
  },
});

export const logoutBtn = style({
  color: "#9b9b9b",
  transition: "color 0.2s ease",
  selectors: {
    "&:hover": {
      color: "#242424",
    },
  },
});
