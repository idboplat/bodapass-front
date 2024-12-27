"use client";
import {
  ActionIcon,
  ButtonProps,
  Checkbox,
  defaultVariantColorsResolver,
  MantineTheme,
  MantineTransition,
  Menu,
  Modal,
  ModalContent,
  Pagination,
  Radio,
  SegmentedControl,
  Select,
  Switch,
  TextInput,
} from "@mantine/core";
import { createTheme, virtualColor } from "@mantine/core";
import { pretendard } from "@font";

// https://mantine.dev/styles/variants-sizes

const OPEN_MENU_TRANSITION: MantineTransition = {
  out: { opacity: 0, transform: "translateY(-4px)" },
  in: { opacity: 1, transform: "translateY(0px)" },
  transitionProperty: "opacity, transform",
};

const BLANK_TRANSITION: MantineTransition = {
  out: {},
  in: {},
  transitionProperty: "",
};

export const theme = createTheme({
  scale: 1,
  /* Put your mantine theme override here */
  fontFamily: pretendard.variable,
  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },
  colors: {},
  components: {
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        // color: variable.thirdColorDefault,
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        h: 47,
        radius: 15,
      },
    }),
    Button: {
      vars: (theme: MantineTheme, props: ButtonProps) => {
        if (props.variant === "default") {
          return {
            root: {
              "--button-color": "var(--mantine-color-text)",
            },
          };
        }
      },
      // styles: (theme: MantineTheme, props: ButtonProps) => {
      //   return {
      //     root: {
      //       color: 'red',
      //     },
      //   };
      // },
      defaultProps: {
        // color: variable.thirdColorDefault,
      },
    },
    Checkbox: Checkbox.extend({
      defaultProps: {
        // color: variable.thirdColorDefault,
      },
    }),
    Menu: Menu.extend({
      defaultProps: {
        transitionProps: {
          transition: OPEN_MENU_TRANSITION,
          timingFunction: "ease-out",
          duration: 300,
        },
      },
    }),
    Modal: Modal.extend({
      defaultProps: {
        transitionProps: {
          transition: BLANK_TRANSITION,
          duration: 0,
          timingFunction: "",
        },
      },
    }),
    ModalContent: ModalContent.extend({
      defaultProps: {
        transitionProps: {
          transition: BLANK_TRANSITION,
          duration: 0,
          timingFunction: "",
        },
      },
    }),
    Pagination: Pagination.extend({
      defaultProps: {
        // color: variable.thirdColorDefault,
        siblings: 2,
        withEdges: true, // Show first/last controls
      },
    }),
    Radio: Radio.extend({
      defaultProps: {
        // color: variable.thirdColorDefault,
      },
    }),
    SegmentedControl: SegmentedControl.extend({
      styles: {
        root: {
          boxShadow: "0px 0px 0px 1px var(--mantine-color-default-border)",
        },
      },
      defaultProps: {
        // color: variable.thirdColorDefault,
        transitionTimingFunction: "ease-out",
        transitionDuration: 300,
      },
    }),
    Select: Select.extend({
      defaultProps: {
        comboboxProps: {
          transitionProps: {
            transition: OPEN_MENU_TRANSITION,
            timingFunction: "ease-out",
            duration: 300,
          },
        },
      },
    }),
    Switch: Switch.extend({
      defaultProps: {
        // color: variable.thirdColorDefault,
      },
    }),
  },
  variantColorResolver(input) {
    const defaultResolvedColors = defaultVariantColorsResolver(input);

    if (input.variant === "ghost") {
      return {
        background: "transparent",
        hover: "var(--mantine-color-default-hover)",
        color: "var(--mantine-color-text)",
        border: "none",
      };
    }

    if (input.color === "first") {
      return {
        background: "transparent",
        hover: "var(--mantine-color-default-hover)",
        color: "var(--mantine-color-text)",
        border: "none",
      };
    } else if (input.color === "second") {
      return {
        background: "transparent",
        hover: "var(--mantine-color-default-hover)",
        color: "var(--mantine-color-text)",
        border: "none",
      };
    } else if (input.color === "third") {
      return {
        background: "transparent",
        hover: "var(--mantine-color-default-hover)",
        color: "var(--mantine-color-text)",
        border: "none",
      };
    }

    return defaultResolvedColors;
  },
});
