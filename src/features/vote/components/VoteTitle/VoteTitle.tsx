import { Box, Text } from "@chakra-ui/react";

type VoteTitleType = {
  title: string | undefined;
};

export const VoteTitle = ({ title }: VoteTitleType) => {
  return (
    <Box minHeight="40px" borderBottom="1px solid #E2E8F0">
      <Text fontSize="md" color="gray.600">
        {(title && title) || "제목"}
      </Text>
    </Box>
  );
};
