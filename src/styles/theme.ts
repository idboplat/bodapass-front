"use client";
import {
  ActionIcon,
  ButtonProps,
  Checkbox,
  defaultVariantColorsResolver,
  Input,
  InputProps,
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
  TextInputProps,
  VariantColorResolverResult,
} from "@mantine/core";
import { createTheme, virtualColor } from "@mantine/core";
import { pretendard } from "@font";
import variable from "@variable";

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
      // vars: (theme: MantineTheme, props: TextInputProps) => {
      //   return {};
      // },
      defaultProps: {
        h: 47,
        radius: 15,
      },
    }),
    Input: Input.extend({
      defaultProps: {
        fz: 16,
      },
    }),
    Button: {
      vars: (theme: MantineTheme, props: ButtonProps) => {
        if (props.variant === "filled") {
          return {
            root: {
              "--button-radius": "10px",
              "--button-bg": variable.colorsBlue2,
              "--button-hover": variable.colorsBlue2,
              "--button-color": variable.colorsWhite4,
              "--button-bd": "none",
            },
          };
        }

        if (props.variant === "outline") {
          return {
            root: {
              "--button-radius": "10px",
              "--button-bg": variable.colorsWhite4,
              "--button-hover": variable.colorsWhite4,
              "--button-color": variable.colorsBlue2,
              "--button-bd": `1px solid ${variable.colorsBlue2}`,
            },
          };
        }

        // props.variant === default
        return {
          root: {
            "--button-radius": "10px",
            "--button-color": "var(--mantine-color-text)",
          },
        };
      },
      styles: (theme: MantineTheme, props: ButtonProps) => {
        return {
          root: {},
          label: { fontSize: 16 },
        };
      },
      defaultProps: {
        // color: variable.thirdColorDefault,
        radius: 15,
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
      styles: () => {
        return {
          input: {
            borderRadius: 15,
            textAlign: "center",
          },
          dropdown: {
            fontSize: 16,
            borderRadius: 15,
            border: "1px solid #588CBF",
            overflow: "hidden",
            padding: 0,
          },
          option: {
            textAlign: "center",
            justifyContent: "center",
            marginRight: "auto",
            fontSize: 16,
            padding: "14px 0",
            borderRadius: 0,
          },
        };
      },
    }),
    Switch: Switch.extend({
      defaultProps: {
        // color: variable.thirdColorDefault,
      },
    }),
  },
  // variantColorResolver(input) {
  //   let result: VariantColorResolverResult | undefined;

  //   if (input.variant === "ghost") {
  //     return {
  //       background: "transparent",
  //       hover: "var(--mantine-color-default-hover)",
  //       color: "var(--mantine-color-text)",
  //       border: "none",
  //     };
  //   }

  //   switch (input.variant) {
  //     case "filled":
  //       result = {
  //         background: "var(--mantine-color-primary)",
  //         hover: "var(--mantine-color-primary-hover)",
  //         color: "var(--mantine-color-white)",
  //         border: "var(--mantine-color-primary)",
  //       };
  //       break;
  //     case "outline":
  //       result = undefined;
  //       break;
  //     default:
  //       result = defaultVariantColorsResolver(input);
  //   }
  //   return result;
  // },
});
