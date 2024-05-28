"use client";

import { Global, ThemeProvider } from "@emotion/react";
import globalTheme from "@/style/globalTheme";
import { PropsWithChildren } from "react";
import globalStyle from "@/style/globalStyle";

export default function Emotion({ children }: PropsWithChildren) {
  const theme = globalTheme();
  return (
    <ThemeProvider theme={theme}>
      <Global styles={() => globalStyle()} />
      <>{children}</>
    </ThemeProvider>
  );
}
