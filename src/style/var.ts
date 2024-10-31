import { CSSPropertiesWithVars } from "@/type/vanillaExtract";
import { calc } from "@vanilla-extract/css-utils";
import { theme } from "./theme";
import { themeToVars } from "@mantine/vanilla-extract";

// https://mantine.dev/styles/vanilla-extract/
export const vars = themeToVars(theme);

export const BEZIER_CURVE = "cubic-bezier(0.23, 1, 0.32, 1)";
export const BOX_SHADOW = "0px 1px 2px 0 rgba(56, 52, 52, 0.4)";

export const flexCenter: CSSPropertiesWithVars = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const absoluteCenter: CSSPropertiesWithVars = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export const fixedMaxSize: CSSPropertiesWithVars = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100dvw",
  height: "100dvh",
};

export const zIndex = {
  header: {
    zIndex: 1000,
  },
  float: {
    zIndex: 200,
  },
  modal: {
    zIndex: 9000,
  },
  toast: {
    zIndex: 10000,
  },
  sidebar: {
    zIndex: 500,
  },
};

type ResponsiveArgs = Partial<Record<keyof typeof vars.breakpoints, CSSPropertiesWithVars>>;
export const responsive = (styles: ResponsiveArgs) => {
  const mediaStyle: Record<string, CSSPropertiesWithVars> = {};
  const breakpoints = vars.breakpoints;

  for (const _key in breakpoints) {
    const key = _key as keyof typeof vars.breakpoints;
    const style = styles[key];

    if (style) {
      mediaStyle[`screen and (min-width: ${breakpoints[key]}px)`] = style;
    }
  }

  return {
    "@media": {
      ...mediaStyle,
    },
  };
};

export const textLine = (lineHeight: string | number, clamp: number): CSSPropertiesWithVars => ({
  wordBreak: "break-all",
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: clamp,
  lineHeight,
  height: calc.multiply(clamp, lineHeight),
});

export const preventUserSelect: CSSPropertiesWithVars = {
  WebkitUserSelect: "none",
  userSelect: "none",
};
