import { Heading } from "@chakra-ui/react";

import { PrivatePageLayout } from "@/components/Layout";

export const ProfilePage = () => {
  return (
    <PrivatePageLayout
      title="마이 페이지"
      header={<Heading size="lg">마이 페이지</Heading>}
    >
      Profile
    </PrivatePageLayout>
  );
};
