"use client";
import { theme } from "@/styles/theme";
import { MantineProvider as Provider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import "dayjs/locale/ko";

interface MantineProviderProps {
  children: React.ReactNode;
  defaultColorScheme: "light" | "dark";
}

export default function MantineProvider({ children, defaultColorScheme }: MantineProviderProps) {
  return (
    <Provider
      theme={theme}
      defaultColorScheme={defaultColorScheme}
      classNamesPrefix="app" // ex) app-Button-root
      withCssVariables={false} // css variable 동적으로 추가되지 않도록
    >
      <DatesProvider settings={{ locale: "ko" }}>{children}</DatesProvider>
    </Provider>
  );
}
