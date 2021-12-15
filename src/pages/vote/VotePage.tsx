import { Heading, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import { GoToBackButton } from "@/components/GoToBackButton";
import { PrivatePageLayout } from "@/components/Layout";
import {
  VoteHeader,
  VoteTitle,
  BodyAfterVote,
  BodyBeforeVote,
} from "@/features/vote/components";

export const VotePage = () => {
  const { voteId } = useParams();
  const { state } = useLocation(); // location={state: 일정id}

  /*🔴🟠🟢
  - 페이지 단에서 참여 여부를 확인하지 않고, VoteContent 컴포넌트로 넘기기
  - VoteContent 에서 api 호출
  - VoteContent 에서 참여 여부 확인하고 before/after 조건부 렌더링
  <VoteContent>
    <title>{title}</title>
    {isJoined ? <ContentAfterVote> : <ContentBeforeVote>}
  </VoteContent>
  🔴🟠🟢
  */

  const [isJoined, setIsJoined] = useState();

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
