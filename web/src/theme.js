import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";
// Disable Chakra focus outline if not keyboard navigating
import "focus-visible/dist/focus-visible";

// Custom themes

const colors = {
  ...chakraTheme.colors,
  primary: "rgba(12,14,17,255)",
  secondary: "rgba(21,26,33,255)",
  tertiary: "rgba(37,44,55,255)",
  heading: "rgb(255,255,255)",
  text: "rgba(93,114,144,255)",
  link: "rgba(247, 74, 74, 1)",
  brand: "#EE1E38",
};

const fonts = {
  ...chakraTheme.fonts,
  heading: "Helvetica",
  text: "Arial",
};

const fontSizes = {
  ...chakraTheme.fontSizes,
  heading: "10rem",
};

const components = {
  ...chakraTheme.components,
  Button: {
    baseStyle: {
      width: "100%",
    },
    variants: {
      solid: {
        paddingY: "1.5em",
        color: "white",
        background: "gray.800",
      },
      outline: {
        paddingY: "1.5em",
        color: "gray.600",
        _hover: {
          background: "gray.800",
          color: "white",
        },
      },
    },
  },
  Input: {
    defaultProps: {
      focusBorderColor: "gray.800",
    },
  },
  Textarea: {
    defaultProps: {
      focusBorderColor: "gray.800",
    },
  },
  Heading: {
    baseStyle: {
      color: "gray.800",
      letterSpacing: "tight",
    },
  },
};

const theme = extendTheme({ colors, fonts, fontSizes, components });

export default theme;
