import { Heading } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

import { BackButton } from "@/components/BackButton";
import { PrivatePageLayout } from "@/components/Layout";
import { VoteHeader, VoteContent } from "@/features/vote/components";

export const VotePage = () => {
  const { voteId } = useParams();

  return (
    <PrivatePageLayout
      title="메모 및 투표"
      header={
        <>
          <BackButton />
          <Heading size="lg">메모 및 투표</Heading>
        </>
      }
    >
      <VoteHeader />
      <VoteContent voteId={voteId} />
    </PrivatePageLayout>
  );
};
