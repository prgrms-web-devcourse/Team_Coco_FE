import { Heading } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

import { GoToBackButton } from "@/components/GoToBackButton";
import { PrivatePageLayout } from "@/components/Layout";
import { MemoHeader, MemoContent } from "@/features/memo/components";

export const MemoPage = () => {
  const { memoId } = useParams();

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
      <MemoHeader />
      <MemoContent memoId={memoId} />
    </PrivatePageLayout>
  );
};
