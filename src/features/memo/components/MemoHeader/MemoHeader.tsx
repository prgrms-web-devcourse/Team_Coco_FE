import { Box, Flex, Spacer, IconButton } from "@chakra-ui/react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";

import { User } from "@/components/User";

type MemoHeaderProps = {
  memoId?: string;
};

export const MemoHeader = (props: MemoHeaderProps) => {
  return (
    <Box padding={1} height="100px">
      <Flex height="100px" alignItems="center">
        <User size="md" />
        <Spacer />
        <IconButton
          aria-label="action-button"
          display="flex"
          justidyContent="center"
          size="lg"
          variant="unstyled"
          icon={<IoEllipsisHorizontalSharp color="#718096" />}
        />
      </Flex>
    </Box>
  );
};
