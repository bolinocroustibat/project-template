import { createTheme } from "@mui/material";

/**
 * Default theme config
 * Warning : The font family is changed in the index.html and the src/App.css
 */
const themeConfig = createTheme({
  /**
   * Colors
   */
  palette: {
    primary: {
      light: "rgba(239, 71, 117, 0.08)",
      main: "#EF4775",
      dark: "#a73151",
    },

    secondary: {
      light: "#646ce8",
      main: "#3E48E3",
      dark: "#2b329e",
    },
  },

  /**
   * Typography
   */
  typography: {
    fontFamily: "Public Sans, sans-serif",

    // Default text
    body1: {
      fontSize: "0.875rem",
    },

    // Button
    button: {
      fontWeight: "bold",
      textTransform: "none",
    },

    h3: {
      margin: 0,
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: "2rem",
    },

    h4: {
      margin: 0,
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: "1.5rem",
    },

    h5: {
      margin: 0,
      fontWeight: 600,
    },

    h6: {
      margin: 0,
      fontWeight: 600,
    },

    subtitle2: {
      margin: 0,
      fontWeight: 600,
    },
  },

  /**
   * Components
   */
  components: {
    // Divider
    MuiDivider: {
      styleOverrides: {
        root: {
          color: "rgba(0, 0, 0, 0.50)",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "26px",
          borderRadius: "16px",
          boxShadow:
            "0px 0px 2px 0px rgba(145, 158, 171, .2), 0px 12px 24px -6px rgba(145, 158, 171, .12)",
        },
      },
    },

    // Label
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          color: "rgb(145, 158, 171)",
        },
      },
    },

    // Input
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          borderRadius: 8,
        },
      },
    },

    // Button
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "0.938rem",
          borderRadius: 8,
        },
        sizeLarge: {
          paddingTop: 10,
          paddingBottom: 10,
        },
      },
    },
  },
});

export { themeConfig };
