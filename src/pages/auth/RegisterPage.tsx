import { Center } from "@chakra-ui/react";

import { PublicPageLayout } from "@/components/Layout";
import { Logo } from "@/components/Logo";

export const RegisterPage = () => {
  return (
    <PublicPageLayout title="회원가입">
      <Center>
        <Logo />
      </Center>
      회원가입 페이지
    </PublicPageLayout>
  );
};
