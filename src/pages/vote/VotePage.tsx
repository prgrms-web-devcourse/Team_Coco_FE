import { Heading, Flex } from "@chakra-ui/react";
import React from "react";
import { useParams, useLocation } from "react-router-dom";

import { GoToBackButton } from "@/components/GoToBackButton";
import { PrivatePageLayout } from "@/components/Layout";
import {
  VoteHeader,
  BodyAfterVote,
  BodyBeforeVote,
} from "@/features/vote/components";
import { useVoteData } from "@/features/vote/hooks";

export const VotePage = () => {
  const { voteId } = useParams();
  const { state: scheduleId } = useLocation();

  const { data: vote } = useVoteData({
    scheduleId: Number(scheduleId),
    votingId: Number(voteId),
  });

  const { votingContentResponses } = vote;

  const isJoined = votingContentResponses
    ?.map(({ participantFlag }) => participantFlag)
    .filter((flag) => flag).length;

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
      <VoteHeader voteId={voteId} scheduleId={scheduleId} />
      <Flex direction="column" height="550px">
        {isJoined ? <BodyAfterVote /> : <BodyBeforeVote />}
      </Flex>
    </PrivatePageLayout>
  );
};
