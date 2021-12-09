import { Box, Center } from "@chakra-ui/react";

import { PublicPageLayout } from "@/components/Layout";
import { Logo } from "@/components/Logo";
import { LoginForm } from "@/features/auth/components";

export const LoginPage = () => {
  return (
    <PublicPageLayout title="로그인">
      <Center>
        <Logo />
      </Center>
      <Box mt={4}>
        <LoginForm />
      </Box>
    </PublicPageLayout>
  );
};
