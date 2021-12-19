import { createStandaloneToast } from "@chakra-ui/react";
import { QueryClient, DefaultOptions } from "react-query";

import theme from "@/theme";

const toast = createStandaloneToast({ theme });

const queryErrorHandler = (error: unknown) => {
  const title =
    error instanceof Error ? error.message : "error connecting to server";

  toast.closeAll();
  toast({
    title,
    status: "error",
    variant: "subtle",
    position: "top",
    isClosable: true,
    duration: 2000,
  });
};

const defaultOptions: DefaultOptions = {
  queries: {
    retry: false,
    onError: queryErrorHandler,
  },
  mutations: {
    retry: false,
    onError: queryErrorHandler,
  },
};

export const queryClient = new QueryClient({
  defaultOptions,
});
