import { Box, Input } from "@chakra-ui/react";

type VoteTitleType = {
  title: string | undefined;
};

export const VoteTitle = ({ title }: VoteTitleType) => {
  return (
    <Box minHeight="40px">
      <Input
        fontSize="md"
        color="gray.600"
        fontWeight="bold"
        variant="flushed"
        value={title || "제목"}
        disabled
      />
    </Box>
  );
};
