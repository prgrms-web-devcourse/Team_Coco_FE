import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { BackButton } from "@/components/BackButton";
import { PrivatePageLayout } from "@/components/Layout";
import { MemoHeader, MemoContent } from "@/features/memo/components";

export const MemoPage = () => {
  const { memoId } = useParams();

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
      <MemoHeader />
      <MemoContent memoId={memoId} />
    </PrivatePageLayout>
  );
};
