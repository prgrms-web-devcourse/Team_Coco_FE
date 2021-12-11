import { Heading } from "@chakra-ui/react";
import React from "react";

import { GoToBackButton } from "@/components/GoToBackButton";
import { PrivatePageLayout } from "@/components/Layout";
import { VoteUpdateForm, VoteHeader } from "@/features/vote/components";

export const VoteUpdatePage = () => {
  return (
    <PrivatePageLayout
      title="id"
      header={
        <>
          <GoToBackButton />
          <Heading size="lg">투표 생성</Heading>
        </>
      }
    >
      <VoteHeader />
      <VoteUpdateForm />
    </PrivatePageLayout>
  );
};
