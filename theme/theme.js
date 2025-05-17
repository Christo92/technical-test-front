import { createTheme } from "@mui/material/styles";

/**
 * Custom Material-UI theme configuration.
 * Defines palette colors, typography styles, and spacing.
 */
const theme = createTheme({
  palette: {
    // Primary color palette
    primary: {
      main: "#283149", // Dark blue/navy
    },
    // Secondary color palette
    secondary: {
      main: "#404b69", // Medium dark blue
    },
    // Custom colors (not part of default MUI palette keys, useful for custom usage)
    accent: "#00818a", // Teal accent color
    light: "#dbedf3",  // Light blue background or highlight
  },
  // Base spacing unit (8px by default)
  spacing: 8,
  typography: {
    // Global font family for the app
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',

    // Font weights for various use cases
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,

    // Headings styles
    h1: {
      fontWeight: 700,
      fontSize: "3rem", // 48px
    },
    h2: {
      fontWeight: 700,
      fontSize: "2.25rem", // 36px
    },
    h3: {
      fontWeight: 500,
      fontSize: "1.75rem", // 28px
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.5rem", // 24px
    },

    // Body text styles
    body1: {
      fontWeight: 400,
      fontSize: "1rem", // 16px
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.875rem", // 14px
    },

    // Button text styles
    button: {
      fontWeight: 500,
      fontSize: "12px",
    },
  },
});

export default theme;
