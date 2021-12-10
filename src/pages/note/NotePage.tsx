import { Heading } from "@chakra-ui/react";

import { PrivatePageLayout } from "@/components/Layout";
import { NoteTabs } from "@/features/note/components";

export const NotePage = () => {
  return (
    <PrivatePageLayout
      title="메모 및 투표"
      header={<Heading size="lg">메모 및 투표</Heading>}
    >
      <NoteTabs />
    </PrivatePageLayout>
  );
};
