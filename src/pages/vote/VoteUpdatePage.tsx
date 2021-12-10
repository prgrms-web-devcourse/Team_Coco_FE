import { Heading } from "@chakra-ui/react";
import React from "react";

import { IconButton } from "@/components/IconButton";
import { PrivatePageLayout } from "@/components/Layout";
import { VoteUpdateForm, VoteHeader } from "@/features/vote/components";

export const VoteUpdatePage = () => {
  return (
    <PrivatePageLayout
      title="id"
      header={
        <>
          <IconButton />
          <Heading size="lg">투표 생성</Heading>
        </>
      }
    >
      <VoteHeader />
      <VoteUpdateForm />
    </PrivatePageLayout>
  );
};
