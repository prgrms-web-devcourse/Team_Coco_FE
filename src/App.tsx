import { ChakraProvider } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { PropsWithChildren, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";

import { AppRoutes } from "@/routes";
import theme from "@/theme";
import { fontsStyle } from "@/theme/foundations/typography";

type AppProviderProps = PropsWithChildren<{}>;

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense fallback={<div>Loading or Splash</div>}>
      <HelmetProvider>
        <ChakraProvider resetCSS={true} theme={theme}>
          <Global styles={fontsStyle} />
          <Router>{children}</Router>
        </ChakraProvider>
      </HelmetProvider>
    </Suspense>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;
