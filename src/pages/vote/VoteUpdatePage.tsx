import { Heading, Flex, Spacer } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { PrivatePageLayout } from "@/components/Layout";
import {
  VoteUpdateForm,
  SaveButton,
  VoteHeader,
} from "@/features/vote/components";

export const VoteUpdatePage = () => {
  const { voteId } = useParams();

  return (
    <PrivatePageLayout
      title="id"
      header={<Heading size="lg">투표 {voteId ? "수정" : "생성"}</Heading>}
    >
      <VoteHeader />
      <Flex direction="column" height="550px">
        <VoteUpdateForm />
        <Spacer />
        <SaveButton />
      </Flex>
    </PrivatePageLayout>
  );
};
