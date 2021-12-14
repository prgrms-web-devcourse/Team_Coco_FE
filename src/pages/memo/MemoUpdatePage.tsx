import { Heading } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

import { GoToBackButton } from "@/components/GoToBackButton";
import { PrivatePageLayout } from "@/components/Layout";
import { MemoUpdateForm, MemoHeader } from "@/features/memo/components";

export const MemoUpdatePage = () => {
  const { memoId } = useParams();

  return (
    <PrivatePageLayout
      title="id"
      header={
        <>
          <GoToBackButton />
          <Heading size="lg">메모 {memoId ? "수정" : "생성"}</Heading>
        </>
      }
    >
      <MemoHeader memoId={memoId} />
      <MemoUpdateForm memoId={memoId} />
    </PrivatePageLayout>
  );
};
