"use client";
import { COLOR_SCHEME_KEY } from "@/constants";
import { colorSchemeManager, theme } from "@/styles/theme";
import { MantineProvider as Provider } from "@mantine/core";

const manager = colorSchemeManager({
  key: COLOR_SCHEME_KEY,
});

interface MantineProviderProps {
  children: React.ReactNode;
  defaultColorScheme: "light" | "dark";
}

export default function MantineProvider({ children, defaultColorScheme }: MantineProviderProps) {
  return (
    <Provider theme={theme} colorSchemeManager={manager} defaultColorScheme={defaultColorScheme}>
      {children}
    </Provider>
  );
}
