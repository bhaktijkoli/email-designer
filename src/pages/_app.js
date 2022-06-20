import { CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { unstable_ClassNameGenerator as ClassNameGenerator } from "@mui/material/className";
ClassNameGenerator.configure((componentName) =>
  componentName.replace("Mui", "")
);
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import theme from "../theme";

const MyApp = ({ Component, pageProps }) => {
  return (
    <StyledEngineProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
      <ToastContainer hideProgressBar={true} />
    </StyledEngineProvider>
  );
};

export default MyApp;
