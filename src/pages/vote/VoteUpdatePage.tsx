import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { PrivatePageLayout } from "@/components/Layout";

export const VoteUpdatePage = () => {
  const { voteId } = useParams();

  return (
    <PrivatePageLayout
      title="id"
      header={<Heading size="lg">투표 {voteId ? "수정" : "생성"}</Heading>}
    >
      투표 갱신
    </PrivatePageLayout>
  );
};
