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
  NumberInputFactory,
  Pagination,
  Radio,
  SegmentedControl,
  Select,
  Styles,
  Switch,
  TextInput,
  TextInputFactory,
  TextInputProps,
  VariantColorResolverResult,
} from "@mantine/core";
import { createTheme, virtualColor } from "@mantine/core";
import variable from "@variable";

// https://mantine.dev/styles/variants-sizes

export const OPEN_MENU_TRANSITION: MantineTransition = {
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
  fontFamily: variable.fontPretendard,
  breakpoints: {
    xs: "30rem",
    sm: "48rem",
    md: "64rem",
    lg: "74rem",
    xl: "90rem",
  },
  colors: {},
  components: {
    ActionIcon: ActionIcon.extend({
      defaultProps: {},
    }),
    TextInput: TextInput.extend({}),
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
        withScrollArea: false,
        comboboxProps: {
          offset: 7,
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
