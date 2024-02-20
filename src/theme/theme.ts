import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#1E1F23",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background-color: #1E1F23;
        }
      `,
    },
  },
});

export default theme;
