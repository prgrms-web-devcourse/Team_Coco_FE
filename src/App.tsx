import { Center, ChakraProvider } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { PropsWithChildren, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { CustomSpinner } from "@/components/CustomSpinner";
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
          <CustomSpinner />
        </Center>
      }
    >
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          {process.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
          <ChakraProvider resetCSS={true} theme={theme}>
            <Global styles={fontsStyle} />
            {children}
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
