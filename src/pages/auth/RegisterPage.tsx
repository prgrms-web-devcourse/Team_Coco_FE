import { Center, Box } from "@chakra-ui/react";

import { PublicPageLayout } from "@/components/Layout";
import { Logo } from "@/components/Logo";
import { RegisterForm } from "@/features/auth/components";

export const RegisterPage = () => {
  return (
    <PublicPageLayout title="회원가입">
      <Center>
        <Logo />
      </Center>
      <Box mt={4}>
        <RegisterForm />
      </Box>
    </PublicPageLayout>
  );
};
