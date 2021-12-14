import { Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import { PrivatePageLayout } from "@/components/Layout";
import { NoteTabs } from "@/features/note/components";

export const NotePage = () => {
  const { state } = useLocation();

  return (
    <PrivatePageLayout
      title="메모 및 투표"
      header={<Heading size="lg">메모 및 투표</Heading>}
    >
      <NoteTabs />
    </PrivatePageLayout>
  );
};
