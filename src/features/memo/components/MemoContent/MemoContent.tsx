import { Stack, Flex, Center, Box, Text, Input } from "@chakra-ui/react";

import { CustomSpinner } from "@/components/CustomSpinner";
import { useMemoData } from "@/features/memo/hooks";

type MemoContentProps = {
  memoId?: string;
  scheduleId?: string;
};

export const MemoContent = ({ memoId, scheduleId }: MemoContentProps) => {
  const { data: memo, isLoading } = useMemoData({
    memoId: Number(memoId),
    scheduleId: Number(scheduleId),
  });

  return (
    <Stack>
      {isLoading && (
        <Center py="8">
          <CustomSpinner />
        </Center>
      )}
      <Flex direction="column">
        <Box minHeight="40px">
          <Input
            fontSize="md"
            color="gray.600"
            fontWeight="bold"
            variant="flushed"
            value={memo?.title}
            disabled
          />
        </Box>
        <Box marginTop="1rem">
          <Text fontSize="sm" color="gray.500">
            {memo?.content}
          </Text>
        </Box>
      </Flex>
    </Stack>
  );
};
