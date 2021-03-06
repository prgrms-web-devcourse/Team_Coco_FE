import { Heading } from "@chakra-ui/react";
import React from "react";
import { useParams, useLocation } from "react-router-dom";

import { GoToBackButton } from "@/components/GoToBackButton";
import { PrivatePageLayout } from "@/components/Layout";
import { MemoHeader, MemoContent } from "@/features/memo/components";

export const MemoPage = () => {
  const { memoId } = useParams();
  const { state: scheduleId } = useLocation();

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
      <MemoHeader memoId={memoId} scheduleId={scheduleId} />
      <MemoContent memoId={memoId} scheduleId={scheduleId} />
    </PrivatePageLayout>
  );
};
