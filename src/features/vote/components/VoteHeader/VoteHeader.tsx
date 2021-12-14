import { Box, Flex, Spacer } from "@chakra-ui/react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";

import { ActionsMenu } from "@/components/ActionsMenu";
import { User } from "@/components/User";

type VoteHeaderProps = {
  voteId?: string;
};

export const VoteHeader = ({ voteId }: VoteHeaderProps) => {
  return (
    <Box padding={1} height="100px">
      <Flex height="100px" alignItems="center">
        <User size="md" />
        <Spacer />
        <ActionsMenu icon={<IoEllipsisHorizontalSharp />}>
          <Box onClick={() => console.log("삭제")}>삭제</Box>
          <Box>취소</Box>
        </ActionsMenu>
      </Flex>
    </Box>
  );
};
