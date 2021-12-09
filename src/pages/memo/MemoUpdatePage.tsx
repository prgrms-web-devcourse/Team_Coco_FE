import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { PrivatePageLayout } from "@/components/Layout";
import { MemoUpdateForm, MemoHeader } from "@/features/memo/components";

export const MemoUpdatePage = () => {
  const { memoId } = useParams();

  return (
    <PrivatePageLayout
      title="id"
      header={<Heading size="lg">메모 {memoId ? "수정" : "생성"}</Heading>}
    >
      <MemoHeader />
      <MemoUpdateForm memoId={memoId} />
    </PrivatePageLayout>
  );
};
