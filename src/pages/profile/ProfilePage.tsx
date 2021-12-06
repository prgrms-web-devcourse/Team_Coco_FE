import { Heading } from "@chakra-ui/react";

import { PageLayout } from "@/components/Layout";

export const ProfilePage = () => {
  return (
    <PageLayout
      title="마이 페이지"
      header={<Heading size="lg">마이 페이지</Heading>}
    >
      Profile
    </PageLayout>
  );
};
