import { Center } from "@chakra-ui/react";

import { PublicPageLayout } from "@/components/Layout";
import { Logo } from "@/components/Logo";

export const LoginPage = () => {
  return (
    <PublicPageLayout title="로그인">
      <Center>
        <Logo />
      </Center>
      로그인 페이지
    </PublicPageLayout>
  );
};
