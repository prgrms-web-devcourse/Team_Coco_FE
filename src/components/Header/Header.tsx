import {
  Portal,
  Box,
  useColorModeValue as mode,
  HStack,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";

type HeaderProps = PropsWithChildren<{}>;

export const Header = ({ children }: HeaderProps) => {
  return (
    <Portal>
      <Box
        w="full"
        pos="fixed"
        top="0"
        h="80px"
        boxShadow="md"
        p={4}
        pb={0}
        bg={mode("white", "white")}
        zIndex={10}
      >
        <HStack h="full" align="center">
          {children}
        </HStack>
      </Box>
    </Portal>
  );
};
