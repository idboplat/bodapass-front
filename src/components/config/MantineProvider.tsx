"use client";
import { THEME_LOCAL_STORAGE_KEY } from "@/constants";
import { theme } from "@/styles/theme";
import { localStorageColorSchemeManager, MantineProvider as Provider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import "dayjs/locale/ko";

const manager = localStorageColorSchemeManager({ key: THEME_LOCAL_STORAGE_KEY });

interface MantineProviderProps {
  children: React.ReactNode;
}

export default function MantineProvider({ children }: MantineProviderProps) {
  return (
    <Provider
      theme={theme}
      colorSchemeManager={manager}
      classNamesPrefix="app" // ex) app-Button-root
      withCssVariables // css variable 동적으로 추가
    >
      <DatesProvider settings={{ locale: "ko" }}>{children}</DatesProvider>
    </Provider>
  );
}
