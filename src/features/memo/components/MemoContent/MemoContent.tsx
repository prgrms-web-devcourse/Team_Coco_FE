import {
  Stack,
  Flex,
  Center,
  Spinner,
  Box,
  Text,
  Textarea,
  Input,
} from "@chakra-ui/react";

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
          <Spinner color="cyan.500" />
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
          <Textarea
            minH={500}
            maxH={500}
            fontSize="sm"
            color="gray.500"
            isReadOnly
            variant="unstyled"
          >
            {memo?.content}
          </Textarea>
        </Box>
      </Flex>
    </Stack>
  );
};
