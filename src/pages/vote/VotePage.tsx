import { Heading, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import { GoToBackButton } from "@/components/GoToBackButton";
import { PrivatePageLayout } from "@/components/Layout";
import {
  VoteHeader,
  BodyAfterVote,
  BodyBeforeVote,
} from "@/features/vote/components";

export const VotePage = () => {
  const { voteId } = useParams();
  const { state } = useLocation(); // location={state: 일정id}

  const [isJoined, setIsJoined] = useState(true);

  return (
    <PrivatePageLayout
      title="메모 및 투표"
      header={
        <>
          <GoToBackButton />
          <Heading size="lg">메모 및 투표</Heading>
        </>
      }
    >
      <VoteHeader voteId={voteId} scheduleId={state} />
      <Flex direction="column" height="550px">
        {isJoined ? (
          <BodyAfterVote voteId={voteId} scheduleId={state} />
        ) : (
          <BodyBeforeVote voteId={voteId} scheduleId={state} />
        )}
      </Flex>
    </PrivatePageLayout>
  );
};
