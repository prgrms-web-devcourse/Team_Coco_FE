import { Box, Flex, Spacer } from "@chakra-ui/react";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";

export const VoteHeader = () => {
  return (
    <Box padding={1} height="100px">
      <Flex height="100px" alignItems="center">
        <Box>작성자 상세정보 공통컴포넌트</Box>
        <Spacer />
        <IoEllipsisHorizontalOutline color="#718096" />
      </Flex>
    </Box>
  );
};
