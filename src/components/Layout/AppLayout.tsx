import { Box, useColorModeValue as mode } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

import { BottomNavigation } from "@/components/BottomNavigation";

type AppLayoutProps = PropsWithChildren<{}>;

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Box
      px={4}
      bg={mode("white", "gray.800")}
      minHeight="100vh"
      overflowX="hidden"
    >
      {children}
      <BottomNavigation />
    </Box>
  );
};
