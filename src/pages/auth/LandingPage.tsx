import { Center, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PublicPageLayout } from "@/components/Layout";
import { Logo } from "@/components/Logo";

export const LandingPage = () => {
  return (
    <PublicPageLayout>
      <Flex direction="column" h="full" justify="space-between">
        <Center>
          <Logo />
        </Center>

        <Button as={Link} to="/login" colorScheme="cyan" isFullWidth size="lg">
          시작하기
        </Button>
      </Flex>
    </PublicPageLayout>
  );
};
