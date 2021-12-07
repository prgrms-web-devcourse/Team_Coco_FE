import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { PrivatePageLayout } from "@/components/Layout";

export const VotePage = () => {
  const { voteId } = useParams();

  return (
    <PrivatePageLayout
      title="메모 및 투표"
      header={<Heading size="lg">메모 및 투표</Heading>}
    >
      투표 상세 보기
    </PrivatePageLayout>
  );
};
