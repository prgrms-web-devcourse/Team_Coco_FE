import { Heading, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { BackButton } from "@/components/BackButton";
import { PrivatePageLayout } from "@/components/Layout";
import {
  VoteHeader,
  VoteTitle,
  BodyAfterVote,
  BodyBeforeVote,
} from "@/features/vote/components";

const dummy = {
  id: 0,
  title: "",
  body: { 1: false, 2: false, 3: true, 4: true },
  participants: ["nick1", "nick2", "nick3"],
};

export const VotePage = () => {
  const { voteId } = useParams();
  const [isJoined, setIsJoined] = useState(true);

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
      <Flex direction="column" height="550px">
        <VoteTitle title={dummy.title} />
        {isJoined ? (
          <BodyAfterVote voteId={voteId} />
        ) : (
          <BodyBeforeVote voteId={voteId} />
        )}
      </Flex>
    </PrivatePageLayout>
  );
};
