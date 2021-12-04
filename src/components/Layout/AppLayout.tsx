import { Flex, useColorModeValue as mode } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

type AppLayoutProps = PropsWithChildren<{}>;

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Flex
      px="1rem"
      direction="column"
      bg={mode("gray.100", "gray.800")}
      height="100vh"
    >
      {children}
    </Flex>
  );
};
