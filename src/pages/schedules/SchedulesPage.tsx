import { Heading } from "@chakra-ui/react";

import { PageLayout } from "@/components/Layout";

export const SchedulesPage = () => {
  return (
    <PageLayout
      title="나의 트립플랜"
      header={<Heading size="lg">나의 트립플랜</Heading>}
    >
      Schedule
    </PageLayout>
  );
};
