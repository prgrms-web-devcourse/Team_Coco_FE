import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { PropsWithChildren, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router } from "react-router-dom";

import { queryClient } from "@/lib/react-query";
import { AppRoutes } from "@/routes";
import theme from "@/theme";
import { fontsStyle } from "@/theme/foundations/typography";

type AppProviderProps = PropsWithChildren<{}>;

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense
      fallback={
        <Center h="100vh">
          <Spinner />
        </Center>
      }
    >
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          {process.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
          <ChakraProvider resetCSS={true} theme={theme}>
            <Global styles={fontsStyle} />
            <Router>{children}</Router>
          </ChakraProvider>
        </QueryClientProvider>
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
