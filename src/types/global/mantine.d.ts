import {
  DefaultMantineColor,
  MantineColorsTuple,
  ButtonVariant,
  ActionIconVariant,
} from "@mantine/core";

// color를 추가하고 싶다면 아래와 같이 추가하면 된다.
type ExtendedCustomColors = "demo" | DefaultMantineColor;
type ExtendedButtonVariant = "demoVarient" | ButtonVariant;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }

  export interface ActionIconProps {
    variant?: ActionIconVariant | "touch";
  }
}
