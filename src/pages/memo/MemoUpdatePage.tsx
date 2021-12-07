import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { PrivatePageLayout } from "@/components/Layout";

export const MemoUpdatePage = () => {
  const { memoId } = useParams();

  return (
    <PrivatePageLayout
      title="id"
      header={<Heading size="lg">메모 {memoId ? "수정" : "생성"}</Heading>}
    >
      메모 갱신
    </PrivatePageLayout>
  );
};
