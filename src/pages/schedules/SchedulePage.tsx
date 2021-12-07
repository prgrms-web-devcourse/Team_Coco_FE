import { Heading } from "@chakra-ui/react";

import { PrivatePageLayout } from "@/components/Layout";

export const SchedulePage = () => {
  return (
    <PrivatePageLayout
      title="id"
      header={<Heading size="lg">스케줄 보기</Heading>}
    >
      스케줄 보기
    </PrivatePageLayout>
  );
};
