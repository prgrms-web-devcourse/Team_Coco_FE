import { createStandaloneToast } from "@chakra-ui/react";
import { QueryClient, DefaultOptions } from "react-query";

const toast = createStandaloneToast();

const queryErrorHandler = (error: unknown) => {
  const title =
    error instanceof Error ? error.message : "error connecting to server";

  toast.closeAll();
  toast({
    title,
    status: "error",
    variant: "subtle",
    isClosable: true,
  });
};

const defaultOptions: DefaultOptions = {
  queries: {
    retry: false,
    onError: queryErrorHandler,
  },
};

export const queryClient = new QueryClient({ defaultOptions });
