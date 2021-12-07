import { Heading } from "@chakra-ui/react";

import { PrivatePageLayout } from "@/components/Layout";

export const SchedulesPage = () => {
  return (
    <PrivatePageLayout
      title="나의 트립플랜"
      header={<Heading size="lg">나의 트립플랜</Heading>}
    >
      Schedule
    </PrivatePageLayout>
  );
};
