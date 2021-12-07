import { Heading } from "@chakra-ui/react";

import { PrivatePageLayout } from "@/components/Layout";

export const NotePage = () => {
  return (
    <PrivatePageLayout
      title="메모 및 투표"
      header={<Heading size="lg">메모 및 투표</Heading>}
    >
      메모, 투표 리스트
    </PrivatePageLayout>
  );
};
